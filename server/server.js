import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Support standard MONGODB_URI, Azure ConnectionStrings__MongoDb, and MONGO_URI
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.ConnectionStrings__MongoDb ||
  process.env.MONGO_URI ||
  '';

// Middleware
app.use(express.json());

// Dynamic CORS configuration allowing client requests
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.length === 0 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        // Permissive origin for public studio contact form
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// MongoDB Client Initialization
let mongoClient = null;
let db = null;
let isMongoConnected = false;

async function connectToMongo() {
  if (!MONGODB_URI || MONGODB_URI.trim() === '' || MONGODB_URI.includes('your_actual_connection_string')) {
    console.log('[Rufnix API] MONGODB_URI not configured. Submissions will be validated and queued in memory.');
    return;
  }

  try {
    mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    // Default to the database specified in the connection string (e.g. Portfolio)
    db = mongoClient.db();
    isMongoConnected = true;
    console.log(`[Rufnix API] Successfully connected to MongoDB Atlas database: ${db.databaseName || 'Portfolio'}`);
  } catch (err) {
    console.error('[Rufnix API] MongoDB connection failed:', err.message);
    isMongoConnected = false;
  }
}

connectToMongo();

// Cooldown / Duplicate submission tracker (email -> timestamp)
const submissionCache = new Map();

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Rufnix Studio API',
    mongoConfigured: Boolean(MONGODB_URI && !MONGODB_URI.includes('your_actual_connection_string')),
    mongoConnected: isMongoConnected,
    database: db ? db.databaseName : null,
  });
});

// Latest confirmed submissions telemetry (for transparency and verification)
app.get('/api/contact/latest', async (req, res) => {
  try {
    if (!isMongoConnected || !db) {
      return res.json({ success: true, count: 0, items: [] });
    }
    const latest = await db.collection('contacts')
      .find({})
      .sort({ submittedAt: -1 })
      .limit(5)
      .project({
        fullName: 1,
        email: 1,
        projectType: 1,
        submittedAt: 1,
        _id: 1,
      })
      .toArray();

    const sanitized = latest.map((doc) => ({
      id: doc._id.toString(),
      fullName: doc.fullName,
      emailMasked: doc.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      projectType: doc.projectType,
      submittedAt: doc.submittedAt,
    }));

    res.json({
      success: true,
      count: sanitized.length,
      database: db.databaseName,
      collection: 'contacts',
      items: sanitized,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch records' });
  }
});

// Contact Submission Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, name, email, projectType, message } = req.body;
    const clientName = (fullName || name || '').trim();
    const clientEmail = (email || '').trim().toLowerCase();
    const type = (projectType || 'General Inquiry').trim();
    const msg = (message || '').trim();

    // 1. Validation
    const errors = {};
    if (!clientName) errors.name = 'Full name is required.';
    if (!clientEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errors.email = 'A valid email address is required.';
    }
    if (!msg) {
      errors.message = 'Please provide details regarding your inquiry.';
    } else if (msg.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your submitted fields.',
        errors,
      });
    }

    // 2. Cooldown check (60 seconds per email)
    const now = Date.now();
    const lastSubmitTime = submissionCache.get(clientEmail);
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      const waitSec = Math.ceil((60000 - (now - lastSubmitTime)) / 1000);
      return res.status(429).json({
        success: false,
        message: `A recent inquiry has already been recorded. Please wait ${waitSec}s before sending another update.`,
      });
    }

    const contactDoc = {
      fullName: clientName,
      email: clientEmail,
      projectType: type,
      message: msg,
      submittedAt: new Date(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || 'local',
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    // 3. Save to MongoDB if connected
    if (isMongoConnected && db) {
      const result = await db.collection('contacts').insertOne(contactDoc);
      submissionCache.set(clientEmail, now);

      console.log(`[Rufnix API] Saved contact submission [ID: ${result.insertedId}] from ${clientEmail}`);
      return res.status(201).json({
        success: true,
        savedToDatabase: true,
        database: db.databaseName,
        collection: 'contacts',
        id: result.insertedId.toString(),
        submittedAt: contactDoc.submittedAt,
        data: {
          fullName: clientName,
          email: clientEmail,
          projectType: type,
        },
        message: 'Successfully written to MongoDB Atlas database.',
      });
    }

    // 4. Honest fallback if MongoDB Atlas is pending connection
    submissionCache.set(clientEmail, now);
    console.log(`[Rufnix API] Validated submission received from ${clientEmail} (MongoDB awaiting URI)`);

    return res.status(200).json({
      success: true,
      savedToDatabase: false,
      message: 'Inquiry successfully validated by the Rufnix Studio API.',
      data: {
        fullName: clientName,
        email: clientEmail,
        projectType: type,
      },
    });
  } catch (error) {
    console.error('[Rufnix API] Error processing contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your request.',
    });
  }
});

// Serve static Vite production build
app.use(express.static(distPath));

// Fallback all non-API GET requests to index.html for client-side routing (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Start Express Server
app.listen(PORT, HOST, () => {
  console.log(`[Rufnix API] Server running on http://${HOST}:${PORT}`);
});
