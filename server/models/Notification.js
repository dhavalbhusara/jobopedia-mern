const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['govt', 'private', 'internship', 'mock-test', 'general'], 
    default: 'govt' 
  },
  targetQualification: { type: String, default: 'All' },
  targetQualifications: [{ type: String }],
  targetState: { type: String, default: 'All India' },
  targetStates: [{ type: String }],
  jobId: { type: String },
  url: { type: String, default: 'https://jobopedia.in' },
  sentBy: { type: String, default: 'Admin' },
  isLive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
