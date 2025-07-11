// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const UserInfo = require('../models/userInfo'); // Import the UserInfo model
const jwt = require('jsonwebtoken');
const router = express.Router();



// sign in route
router.post("/signin", async(req, res) => {
  const {email, password} = req.body
  console.log("Email:", email);  // Debugging
  console.log("Password:", password);  // Debugging


  try {
    //find user by email
    const user = await UserInfo.findOne({email})
    if (!user) {
      return res.status(400).json({error:"Invalid credentials"})
    }

    //compare password with hash pass in db
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({error: "Invalid credentials"})
    }

    // generate jwt token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
      expiresIn:"1h"
    })

    res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
   

  } catch (error){
    console.error(error)
    res.status(500).json({error: "Server error"})
  }
})


// Sign Up Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserInfo.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserInfo({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
