import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to handle favicon.ico requests
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    return res.status(204).json({ nope: true });
  }
  next();
});

const __dirname = path.resolve(); // Set {__dirname} to current working directory

// Make the 'uploads' folder for user-uploaded images static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Make the 'public/images' folder for sample images static
app.use('/images', express.static(path.join(__dirname, '/backend/public/images')));
// ----------------------------

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/payment', paymentRoutes);

//-------------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //any app route that is not api will redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
