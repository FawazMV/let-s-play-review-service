import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './Models/config.js'

import Routes from './Routes.js'

dotenv.config()
const app = express()
app.use(express.json());
const corsOptions = {
    origin: ['https://let-s-play-turf-service.onrender.com', 'https://let-s-play-user-service.onrender.com'],
    methods: 'GET,POST,PATCH,PUT,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));

app.use('/', Routes)

connectDB()
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(9999, () => {
        console.log(`Server running on port 9999`);
    });
});