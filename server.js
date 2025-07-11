const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import user routes
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoute');
console.log(userRoutes)
dotenv.config();
// for debug
console.log(process.env.DB_URI); 

// Connect to MongoDB
connectDB();

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming requests with JSON payload

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);  // Add the new user routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
