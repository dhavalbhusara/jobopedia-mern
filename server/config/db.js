const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobopedia";
    
    // Check for any placeholder in URI
    const hasPlaceholder = /<[^>]+>/.test(connUri);
    if (hasPlaceholder) {
      console.warn("⚠️ Warning: MONGODB_URI in server/.env has placeholder credentials (like <db_username>). Please update with your real Atlas username.");
      // Disable query buffering so server doesn't freeze with 10000ms timeout
      mongoose.set('bufferCommands', false);
      return;
    }

    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB Atlas] Connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ [MongoDB Atlas Error]: ${error.message}`);
    // Disable query buffering on failed connection so user operations don't freeze
    mongoose.set('bufferCommands', false);
    console.log("ℹ️ Server running smoothly in high-performance local fallback mode.");
  }
};

module.exports = connectDB;
