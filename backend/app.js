import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());


app.get('/', (req, res) => {
    res.send("This is the Home Page");
});

app.use("/api/users", userRoutes);

connectDB();

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})