// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
console.log(process.env.DB_URI); 

const connectDB = async () => {
  try {
    // Connect to MongoDB with the URI from the .env file
    await mongoose.connect(process.env.DB_URI) 
    console.log("MongoDB connected successfully")
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Stop the server if database connection fails
  }
};

module.exports = connectDB;
