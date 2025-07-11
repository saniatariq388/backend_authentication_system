
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userInfo")


//sign up controller
exports.signUp = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "User with this email already exists"})
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        await newUser.save()

        // creating JWT

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{
            expiresIn: "1h",
        })

        res.status(201).json({ success: true, token, user: newUser})

    } catch(error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}


// sign in controler

exports.signIn = async (req, res) => {
    const {email , password} = req.body


    try {
        // finding user by email
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({error: "Invalid credentials"})
        }

        // compare password
        const isMatCh = await bcrypt.compare(password, user.password)
        if (!isMatCh) {
            return res.status(400).json({error: "Invalid credentials"})
        }

        // create JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(200).json({success: true, token, user})
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }

}

// forgot password controller send reset link

exports.forgotPassword = async (req, res) => {
    const {email} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"No account found with this email address"})
        }

        res.status(200).json({ success: true, message: "Password reset link sent to your email"})
    } catch(error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}



// reset password controller
exports.resetPassword = async( req, res) => {
    const {token, password} = req.body
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
