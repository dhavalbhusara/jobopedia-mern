const mongoose = require('mongoose');

const pushSubscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true
  },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  userId: {
    type: String,
    default: null
  },
  qualification: {
    type: String,
    default: 'All'
  },
  state: {
    type: String,
    default: 'All India'
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PushSubscription', pushSubscriptionSchema);
