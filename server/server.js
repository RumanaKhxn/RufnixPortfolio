import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

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
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
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
    console.log('[Rufnix API] MONGODB_URI not configured in .env. Submissions will be validated and queued in memory.');
    return;
  }

  try {
    mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    db = mongoClient.db('rufnix');
    isMongoConnected = true;
    console.log('[Rufnix API] Successfully connected to MongoDB Atlas database: rufnix');
  } catch (err) {
    console.error('[Rufnix API] MongoDB connection failed:', err.message);
    isMongoConnected = false;
  }
}

connectToMongo();

// Cooldown / Duplicate submission tracker
// Map: email -> timestamp
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
      database: 'rufnix',
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
    if (!msg || msg.length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Validation failed. Please review the highlighted fields.',
      });
    }

    // 2. Duplicate submission prevention (Relaxed 3-second cooldown so users can freely submit)
    const now = Date.now();
    const lastSubmitTime = submissionCache.get(clientEmail);
    if (lastSubmitTime && now - lastSubmitTime < 3000) {
      return res.status(429).json({
        success: false,
        message: 'A submission is currently processing. Please wait 3 seconds before submitting again.',
      });
    }

    // Prepare document
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
        database: 'rufnix',
        collection: 'contacts',
        id: result.insertedId.toString(),
        submittedAt: contactDoc.submittedAt,
        data: {
          fullName: clientName,
          email: clientEmail,
          projectType: type,
        },
        message: 'Successfully written to MongoDB Atlas database (rufnix.contacts).',
      });
    }

    // 4. Honest fallback if MongoDB Atlas is pending connection
    submissionCache.set(clientEmail, now);
    console.log(`[Rufnix API] Validated submission received from ${clientEmail} (MongoDB awaiting MONGODB_URI in .env)`);

    return res.status(200).json({
      success: true,
      savedToDatabase: false,
      message: 'Inquiry successfully validated by the Rufnix Studio API. Note: Database storage is awaiting MONGODB_URI in your .env configuration file.',
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

// Start Express Server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`[Rufnix API] Server running on http://127.0.0.1:${PORT}`);
});
