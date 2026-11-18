const mongoose = require('mongoose');

const LinkedInAccountSchema = new mongoose.Schema({
  accountKey: {
    type: String,
    default: 'primary',
    unique: true
  },
  personUrn: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'LinkedIn Member'
  },
  email: {
    type: String,
    default: ''
  },
  accessToken: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.LinkedInAccount || mongoose.model('LinkedInAccount', LinkedInAccountSchema);
