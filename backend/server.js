import 'express-async-error';
import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './handlers/errorHandler.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

// import for routes;
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});