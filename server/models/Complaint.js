const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      'Job Application Issue',
      'Fake or Expired Job Report',
      'MCQ / Test Question Error',
      'Website Technical Problem',
      'Account / Login Assistance',
      'Suggestion / Feedback',
      'Other Complaint'
    ],
    default: 'Other Complaint'
  },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  adminReply: { type: String, default: '' },
  userId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
