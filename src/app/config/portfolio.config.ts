export const PORTFOLIO_CONFIG = {
  name: 'Nitanshu Chaudhary',
  title: 'Full Stack .NET Developer',
  noticePeriod: 'Serving Notice Period — 30 Days Left (Immediate / 30-Day Joiner)',
  badge: 'Open to Full-Time Opportunities',
  company: 'CS Soft Solutions (I) Pvt. Ltd.',
  phone: '+91 90151 60816',
  location: 'Chandigarh, India',
  email: 'nitanshu.choudhary.dev@gmail.com',
  githubUsername: 'Nitanshu-Choudhary',
  githubUrl: 'https://github.com/Nitanshu-Choudhary',
  linkedinUrl: 'https://www.linkedin.com/in/nitanshu-choudhary-b9a340351',
  resumeUrl: '/assets/Nitanshu-Chaudhary-Resume.html',
  formspreeEndpoint: 'https://formspree.io/f/xbldwazr',

  summary: 'Full Stack .NET Developer with 3+ years of experience building and supporting enterprise web applications in C#, ASP.NET Core, and Angular. Comfortable owning features end-to-end — from API design through deployment and production support. Serving 30-day notice period and available for new opportunities.',

  skills: {
    backend: ['C#', 'ASP.NET Core', 'ASP.NET MVC', '.NET', 'REST API Design', 'Dapper', 'Entity Framework Core'],
    frontend: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive UI'],
    architecture: ['Clean Architecture', 'SOLID Principles', 'Microservices', 'Agile/Scrum', 'Unit Testing', 'Code Reviews'],
    database: ['SQL Server', 'PostgreSQL'],
    cloudDevOps: ['Azure Functions', 'Durable Functions', 'Azure Blob Storage', 'Application Insights', 'Docker', 'Git', 'IIS', 'CI/CD Pipelines'],
    integrations: ['HubSpot API', 'Shopify API', 'Webhook-based Sync'],
    aiAssisted: ['GitHub Copilot', 'Codex', 'Claude (Prompt Engineering & Test Scaffolding)']
  },

  experience: [
    {
      role: 'Software Developer',
      company: 'CS Soft Solutions (I) Pvt. Ltd.',
      duration: '2023 – Present | 3+ Years',
      location: 'Mohali, India',
      highlights: [
        'Built and maintained REST APIs in ASP.NET Core (C#, Dapper, EF Core) for business-critical workflows; refactored core services toward Clean Architecture layering.',
        'Shipped full-stack features end-to-end across Angular and ASP.NET Core within a two-week Agile sprint cadence.',
        'Built Azure Functions and Durable Functions to automate background jobs, reducing report turnaround from same-day to minutes.',
        'Connected HubSpot and Shopify APIs to automate customer onboarding, barcode lifecycle tracking, and CRM sync.',
        'Tuned SQL Server and PostgreSQL queries (indexing, query rewrites) to optimize endpoint response times.',
        'Production support rotation for IIS deployments and CI/CD releases using Application Insights, Azure Log Stream, and KQL.',
        'Adopted GitHub Copilot and Claude for scoped prompt engineering, refactoring, and test scaffolding to cut routine dev time by 40-50%.'
      ]
    }
  ],

  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Chandigarh University',
      period: '2023 – 2025'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'SVSD PG College, Bhatoli',
      period: '2022'
    }
  ]
};
