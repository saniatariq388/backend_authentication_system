const express = require('express');
const UserInfo = require('../models/userInfo'); // Assuming you have a UserInfo model
const router = express.Router();

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await UserInfo.find(); // Fetch all users from MongoDB
        res.status(200).json(users); // Return the users as JSON
        console.log(users)
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Route to get a user by ID (Optional)
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserInfo.findById(req.params.id); // Find a user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user); // Return the user as JSON
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

module.exports = router;
