const mongoose = require('mongoose');

const OAuthStateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Automatically expire and remove after 10 minutes
  }
});

module.exports = mongoose.models.OAuthState || mongoose.model('OAuthState', OAuthStateSchema);
