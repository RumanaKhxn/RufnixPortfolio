export const studioData = {
  name: "Rufnix Studio",
  shortName: "RF",
  tagline: "Engineered by imagination.",
  statement: "Two minds. One vision. Building what's next.",
  email: "rufnixstudio@gmail.com",
  instagram: "https://www.instagram.com/rufnix.studio/",
  availability: "Available for new projects",
  
  founders: [
    {
      name: "Rumana Khan",
      role: "Software Developer",
      avatarCode: "RK",
      bio: "Co-founder & Software Developer at Rufnix Studio. Specializing in full-stack architecture, responsive web applications, and database-driven systems.",
      github: "https://github.com/RumanaKhxn",
      linkedin: "https://www.linkedin.com/in/rumana-khan-a5460435a/",
      skills: ["React", "JavaScript", "C#", ".NET", "SQL Server", "Tailwind CSS"],
    },
    {
      name: "Sayyeda Farnaaz",
      role: "Software Developer",
      avatarCode: "SF",
      bio: "Co-founder & Software Developer at Rufnix Studio. Focused on frontend engineering, intuitive UI/UX implementation, and intelligent software interfaces.",
      github: "https://github.com/Sd-Farnaaz",
      linkedin: "https://www.linkedin.com/in/farnaaz-sd/",
      skills: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "UI Systems"],
    }
  ],

  stats: [
    { label: "FOUNDING DEVELOPERS", value: "02" },
    { label: "CORE ARCHITECTURES", value: "Full Stack" },
    { label: "MODERN STACK", value: "React + .NET" },
    { label: "CLIENT FOCUS", value: "100%" }
  ],

  skillCategories: [
    {
      title: "Frontend Engineering",
      icon: "Layout",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Next.js"],
      accent: "emerald"
    },
    {
      title: "Backend & APIs",
      icon: "Server",
      technologies: ["Node.js", "Express.js", "C#", ".NET"],
      accent: "lime"
    },
    {
      title: "Databases & Storage",
      icon: "Database",
      technologies: ["MongoDB", "MySQL", "SQL Server"],
      accent: "mint"
    },
    {
      title: "Tools & Development",
      icon: "Terminal",
      technologies: ["Git", "GitHub", "VS Code", "Postman"],
      accent: "emerald"
    }
  ],

  projects: [
    {
      id: "fr-studio",
      title: "F&R Studio",
      category: "Software Product",
      status: "In Development",
      isFeatured: true,
      description: "A multi-tenant luxury salon management, scheduling, and client experience platform engineered to streamline salon bookings, advance deposits, and stylist coordination.",
      image: "/assets/projects/fr-beauty-studio.png",
      hasGenuineImage: true,
      stack: ["React", ".NET", "C#", "SQL Server", "Tailwind CSS"],
      highlights: [
        "Live Availability Booking & Scheduling",
        "Integrated Advance Deposit Tracking",
        "Multi-Tenant Salon Security"
      ],
      codeFilename: "SalonBook.Api/BookingController.cs",
      codeSnippet: `[HttpPost("verify-deposit")]
public async Task<IActionResult> ProcessDeposit([FromBody] DepositRequest req)
{
    var salon = await _salonService.GetTenantAsync(req.TenantId);
    var confirmed = await _bookingEngine.LockSlotAsync(req.SlotId, salon.Id);
    return Ok(new { status = "Confirmed", deposit = confirmed });
}`,
      primaryAction: {
        label: "Follow Our Journey",
        url: "https://www.instagram.com/rufnix.studio/",
        isExternal: true
      }
    },
    {
      id: "lifepilot",
      title: "LifePilot",
      category: "Productivity Application",
      status: "Active Project",
      isFeatured: false,
      description: "A comprehensive productivity and goal-management application designed for structured task workflows, priority matrix monitoring, and active project analytics.",
      image: "/assets/projects/lifepilot.png",
      hasGenuineImage: true,
      stack: ["React", "Node.js", "Express.js", "Groq AI", "Tailwind CSS"],
      highlights: [
        "Interactive Goals & Project Matrix",
        "Overdue Task Priority Alerts",
        "AI Assistant Workflow Integration"
      ],
      codeFilename: "LifePilot.API/taskEngine.js",
      codeSnippet: `export const computeUrgencyMatrix = (tasks, projectMilestones) => {
  const pending = tasks.filter(t => !t.completed);
  const prioritized = pending.sort((a, b) => new Date(a.due) - new Date(b.due));
  return { overdueCount: prioritized.length, critical: prioritized.slice(0, 3) };
};`,
      primaryAction: {
        label: "Internal Workspace",
        url: null,
        isExternal: false
      }
    },
    {
      id: "bytemind",
      title: "ByteMind AI",
      category: "Conversational AI Platform",
      status: "Active Project",
      isFeatured: false,
      description: "A responsive modern AI chatbot web application built for real-time prompt-response streaming, conversational context persistence, and clear logic deduction.",
      image: "/assets/projects/bytemind.png",
      hasGenuineImage: true,
      stack: ["React", "Node.js", "Tailwind CSS", "REST API"],
      highlights: [
        "Real-Time Stream Processing",
        "Deductive Logic Analysis Interface",
        "Clean Minimalist Chat Architecture"
      ],
      codeFilename: "bytemind/chatEngine.jsx",
      codeSnippet: `const handleSendMessage = async (userPrompt) => {
  setConversation(prev => [...prev, { role: 'user', text: userPrompt }]);
  const aiResponse = await fetchChatCompletion(userPrompt);
  setConversation(prev => [...prev, { role: 'bot', text: aiResponse }]);
};`,
      primaryAction: {
        label: "Internal Workspace",
        url: null,
        isExternal: false
      }
    },
    {
      id: "nutriroute",
      title: "NutriRoute",
      category: "Proposed Ecosystem",
      status: "Proposed Project",
      isFeatured: false,
      description: "A proposed hyper-local meal and tiffin ecosystem connecting health-conscious consumers with verified local food providers through dietary indexing.",
      image: null,
      hasGenuineImage: false,
      placeholderType: "architecture",
      stack: ["React", "Node.js", "Express.js", "MongoDB"],
      highlights: [
        "Hyper-Local Geofenced Provider Index",
        "Automated Tiffin Subscription Logic",
        "Custom Dietary Preference Filters"
      ],
      codeFilename: "nutriroute/routingSchema.js",
      codeSnippet: `const providerSchema = new Schema({
  name: { type: String, required: true },
  deliveryRadiusKm: { type: Number, default: 5 },
  dietaryTags: ['Vegetarian', 'High-Protein', 'Custom Tiffin'],
  activeSubscriptions: [{ type: Schema.Types.ObjectId, ref: 'Subscription' }]
});`,
      primaryAction: {
        label: "Architecture Blueprint",
        url: null,
        isExternal: false
      }
    },
    {
      id: "umbrella-invoice",
      title: "Umbrella Invoice Manager",
      category: "Financial Tool",
      status: "Active Project",
      isFeatured: false,
      description: "An invoice management system engineered for structured bill generation, automated tax and subtotal computation, client ledgers, and payment tracking.",
      image: null,
      hasGenuineImage: false,
      placeholderType: "architecture",
      stack: ["React", "C#", ".NET", "SQL Server"],
      highlights: [
        "Automated Tax & Line Item Reconciliation",
        "Structured Client Invoice Ledger",
        "Exportable Financial Reports"
      ],
      codeFilename: "Umbrella.Api/InvoiceLedger.cs",
      codeSnippet: `public record InvoiceSummary(Guid InvoiceId, decimal Subtotal, decimal TaxAmount, decimal GrandTotal)
{
    public static InvoiceSummary Compute(List<LineItem> items, decimal taxRate) =>
        new(Guid.NewGuid(), items.Sum(i => i.Amount), items.Sum(i => i.Amount) * taxRate, items.Sum(i => i.Amount) * (1 + taxRate));
}`,
      primaryAction: {
        label: "Internal Workspace",
        url: null,
        isExternal: false
      }
    }
  ],

  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Website Development",
      description: "Crafting bespoke, lightning-fast portfolio websites, corporate showcases, and landing experiences with cinematic motion and responsive precision.",
      icon: "Globe"
    },
    {
      id: "frontend",
      number: "02",
      title: "Responsive Frontend Development",
      description: "Translating sophisticated designs into scalable, pixel-perfect React and modern CSS architectures with smooth cross-device adaptability.",
      icon: "Layout"
    },
    {
      id: "ui-impl",
      number: "03",
      title: "UI Implementation",
      description: "Bringing high-fidelity mockups to life with micro-interactions, accessible UI components, and polished design systems that feel organic.",
      icon: "Sparkles"
    },
    {
      id: "full-stack",
      number: "04",
      title: "Full-Stack Web Applications",
      description: "Building cohesive end-to-end applications marrying interactive frontends with structured Node.js or .NET backend architectures.",
      icon: "Cpu"
    },
    {
      id: "api-integration",
      number: "05",
      title: "API Integration",
      description: "Connecting external services, RESTful endpoints, third-party authentication, and AI provider streams seamlessly into unified web apps.",
      icon: "Share2"
    },
    {
      id: "database-apps",
      number: "06",
      title: "Database-Driven Applications",
      description: "Architecting reliable data models, relational schemas with SQL Server/MySQL, and flexible document stores using MongoDB.",
      icon: "Database"
    },
    {
      id: "product-dev",
      number: "07",
      title: "Software Product Development",
      description: "Partnering to evolve concepts into full-fledged software solutions from initial scoping and architecture to production deployment.",
      icon: "Layers"
    }
  ],

  workflow: [
    {
      step: "01",
      title: "Discover",
      subtitle: "REQUIREMENTS & SCOPE",
      description: "We understand the core problem, user journeys, data requirements, and technical constraints before writing a single line of code."
    },
    {
      step: "02",
      title: "Design",
      subtitle: "ARCHITECTURE & INTERFACE",
      description: "We establish the visual hierarchy, component architecture, responsive breakpoints, and interaction models for an effortless experience."
    },
    {
      step: "03",
      title: "Develop",
      subtitle: "CLEAN IMPLEMENTATION",
      description: "We engineer modular, type-conscious frontend components, resilient backend services, and clean database integrations."
    },
    {
      step: "04",
      title: "Test",
      subtitle: "VALIDATION & REFINEMENT",
      description: "We rigorously test cross-browser compatibility, mobile responsiveness, layout stability, accessibility, and performance metrics."
    },
    {
      step: "05",
      title: "Deliver",
      subtitle: "DEPLOYMENT & HANDOFF",
      description: "We deploy the application with clean build artifacts, documentation, and maintainable codebase ready for continuous evolution."
    }
  ]
};
