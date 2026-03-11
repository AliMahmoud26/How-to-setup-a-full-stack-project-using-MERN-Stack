import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "Email and Password are required"});
    }

    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
            const salt = await bcrypt.getSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                password: hashedPassword
            })
            res.status(201).json({message: "User Registered", user: {email: user.email}});
        }
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
})