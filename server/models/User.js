const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['ADMIN', 'HR_ADMIN', 'CONTENT_ADMIN', 'MCQ_EDITOR', 'CANDIDATE'], 
    default: 'CANDIDATE' 
  },
  state: { type: String, default: 'Gujarat' },
  qualification: { type: String, default: 'Graduate' },
  targetRole: { type: String },
  resumeTitle: { type: String, default: 'Candidate_ATS_Resume.pdf' },
  isVerified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
