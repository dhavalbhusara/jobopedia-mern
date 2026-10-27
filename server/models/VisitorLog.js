const mongoose = require('mongoose');

const VisitorLogSchema = new mongoose.Schema({
  date: { type: String, required: true, index: true }, // Format: 'YYYY-MM-DD' e.g. '2026-10-27'
  month: { type: String, required: true, index: true }, // Format: 'YYYY-MM' e.g. '2026-10'
  page: { type: String, default: 'home' },
  deviceType: { type: String, enum: ['Mobile', 'Desktop', 'Tablet'], default: 'Desktop' },
  browser: { type: String, default: 'Chrome' },
  state: { type: String, default: 'All India' },
  referrer: { type: String, default: 'Direct' },
  ip: { type: String, required: true, index: true },
  visitCount: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure unique visitor per IP per date (1 visit per user per day)
VisitorLogSchema.index({ ip: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('VisitorLog', VisitorLogSchema);
