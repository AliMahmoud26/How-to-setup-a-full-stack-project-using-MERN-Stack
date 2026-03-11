import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})