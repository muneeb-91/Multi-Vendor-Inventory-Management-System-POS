import 'express-async-error';
import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './handlers/errorHandler.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

// import for routes;
import userRoutes from './routes/user.routes.js';
import vendorRoutes from './routes/vendor.routes.js';
import productRoutes from './routes/product.routes.js';
import supplierRoutes from './routes/supplier.routes.js';
import categoryRoutes from './routes/category.routes.js';
import managerRoutes from './routes/manager.routes.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/product', productRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/manager', managerRoutes);

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});