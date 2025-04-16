import express from 'express';
import dotenv from 'dotenv/config';
import authRouter from './routes/authRoute.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Initiating express App
const app = express();

const PORT = process.env.PORT || 5000
const BACKEND_URL = process.env.BACKEND_URL;

// Connect Database
await connectDB();


// Middileware to access token


const allowedOrigins = [
    'http://localhost:5173', 'https://mern-auth-client-flame.vercel.app' // ✅ Your Vercel frontend URL
    // 
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true, // ✅ Important for sending cookies
};

app.use(express.json());
app.use(cors(corsOptions));
// Middleware to extract data from the user
app.use(cookieParser());


app.listen(PORT, (req, res) => {
    console.log(`Server running on ${BACKEND_URL}${PORT}...`)
});


app.get('/', (req, res) => {
    res.send('API Working..')
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
