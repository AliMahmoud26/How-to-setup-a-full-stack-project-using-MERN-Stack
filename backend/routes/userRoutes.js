import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Please provide all the fields'});
    }

    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({message: 'User registered successfully', user: {email: user.email}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
})


export default router;