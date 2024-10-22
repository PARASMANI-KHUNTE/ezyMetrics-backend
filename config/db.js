const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

module.exports = connectDB;
