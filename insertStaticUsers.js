

const mongoose = require('mongoose');
const UserInfo = require('./models/userInfo'); 


// Array of static users (use hashed passwords if possible)
const users = [
    { name: "John Doe", email: "johndoe@example.com", password: "hashed_password_1", createdAt: new Date() },
    { name: "Jane Smith", email: "janesmith@example.com", password: "hashed_password_2", createdAt: new Date() },
    { name: "Mary Johnson", email: "maryjohnson@example.com", password: "hashed_password_3", createdAt: new Date() },
    { name: "James Brown", email: "jamesbrown@example.com", password: "hashed_password_4", createdAt: new Date() },
    { name: "Emily Davis", email: "emilydavis@example.com", password: "hashed_password_5", createdAt: new Date() },
    { name: "Michael Miller", email: "michaelmiller@example.com", password: "hashed_password_6", createdAt: new Date() },
    { name: "Sarah Wilson", email: "sarahwilson@example.com", password: "hashed_password_7", createdAt: new Date() },
    { name: "David Moore", email: "davidmoore@example.com", password: "hashed_password_8", createdAt: new Date() },
    { name: "Sophia Taylor", email: "sophiataylor@example.com", password: "hashed_password_9", createdAt: new Date() },
    { name: "Daniel Lee", email: "daniellee@example.com", password: "hashed_password_10", createdAt: new Date() }
];

// MongoDB connection string (use your own connection string here)
const dbUrl = process.env.DB_URI
// Connect to MongoDB
mongoose.connect(dbUrl)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Check if users already exist in the database
        const existingUsers = await UserInfo.find();
        if (existingUsers.length > 0) {
            console.log("Users already exist in the database.");
            return;
        }

        // Insert users if none exist
        await UserInfo.insertMany(users);
        console.log("10 static users inserted successfully.");
        console.log(users)
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
