const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const { noSqlSanitizer } = require('./middleware/security');

const jobsRouter = require('./routes/jobs');
const adminRouter = require('./routes/admin');
const mockTestsRouter = require('./routes/mockTests');
const authRouter = require('./routes/auth');
const aiRouter = require('./routes/ai');
const notificationsRouter = require('./routes/notifications');
const analyticsRouter = require('./routes/analytics');
const complaintsRouter = require('./routes/complaints');
const { autoDeleteExpiredJobs } = require('./utils/autoExpiredJobsCleaner');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// 1. Security: Hide Express Server Signature
app.disable('x-powered-by');

// 2. Security: Global HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// 3. Security: Restricted CORS Policy
const allowedOrigins = [
  'https://jobopedia.in',
  'https://www.jobopedia.in',
  'https://jobopedia-mern.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.jobopedia.in') ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Access denied for this origin.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 4. Security: Input Sanitization & Payload limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(noSqlSanitizer);

// 5. Security: Global Rate Limiter for general endpoints
app.use('/api', apiLimiter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Jobopedia MERN Backend API',
    security: 'Hardened (CORS, RateLimiting, Sanitized)',
    database: 'MongoDB Atlas Connected',
    timestamp: new Date().toISOString()
  });
});

// Google AdSense ads.txt snippet
app.get('/ads.txt', (req, res) => {
  res.type('text/plain');
  res.send('google.com, pub-2309467781992974, DIRECT, f08c47fec0942fa0\n');
});

// API Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/mock-tests', mockTestsRouter);
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/complaints', complaintsRouter);

// Global Error Handler (Never expose stack traces in production)
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [Jobopedia MERN Hardened Server] Running on http://localhost:${PORT}`);
  
  // ⚡ Feature: Automatic Daily Expired Jobs Cleanup
  // Run 5 seconds after boot to ensure MongoDB Atlas connection is fully ready
  setTimeout(() => {
    autoDeleteExpiredJobs().catch(e => console.warn('[AutoExpiredCleaner Boot Error]:', e.message));
  }, 5000);

  // Recurring background schedule: check and auto-purge expired jobs every 6 hours
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  setInterval(() => {
    autoDeleteExpiredJobs().catch(e => console.warn('[AutoExpiredCleaner Interval Error]:', e.message));
  }, SIX_HOURS).unref();
});
