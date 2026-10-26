const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const jobsRouter = require('./routes/jobs');
const adminRouter = require('./routes/admin');
const mockTestsRouter = require('./routes/mockTests');
const authRouter = require('./routes/auth');
const aiRouter = require('./routes/ai');
const notificationsRouter = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Jobopedia MERN Backend API',
    database: 'MongoDB Atlas Connected',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/mock-tests', mockTestsRouter);
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/notifications', notificationsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [Jobopedia MERN Server] Running on http://localhost:${PORT}`);
});
