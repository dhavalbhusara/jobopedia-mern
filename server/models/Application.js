const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, default: 'Gujarat' },
  qualification: { type: String, required: true },
  targetJob: { type: String, required: true },
  resumeTitle: { type: String, default: 'Candidate_Resume.pdf' },
  status: { type: String, default: 'Shortlisted' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
