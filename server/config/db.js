const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobopedia";
    
    if (connUri.includes('<username>') || connUri.includes('<password>')) {
      console.warn("⚠️ Warning: MONGODB_URI in server/.env has placeholder credentials. Please update with your MongoDB Atlas details.");
      return;
    }

    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ [MongoDB Atlas] Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ [MongoDB Atlas Error]: ${error.message}`);
    console.log("ℹ️ Server continuing in memory-safe fallback mode.");
  }
};

module.exports = connectDB;
