const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edunova';
    console.log(`Attempting MongoDB connection to ${connStr}...`);
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}`);
    console.warn('Backend server running in API memory/fallback mode for development.');
  }
};

module.exports = connectDB;
