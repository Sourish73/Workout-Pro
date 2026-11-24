import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import logRoutes from './routes/logRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory or root fallback
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || 'COMPLETE 12-WEEK WORKOUT PLAN';

// Enable Bulletproof CORS for Vercel, Localhost & Custom Domains
const allowedOrigins = [
  'https://akshita-sahu.vercel.app',
  'https://workout-pro.vercel.app',
  'https://workout-pro-two.vercel.app',
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Preflight OPTIONS for all routes
app.options('*', cors());

// Direct header fallback middleware to guarantee no browser CORS rejection
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Raw body parser exclusively for Razorpay Webhook HMAC signature verification
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Standard Body Parsers for all other routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: APP_NAME,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    author: 'Akshita Sahu',
    email: 'Fitwithakshita@gmail.com',
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/logs', logRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`,
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start listening with automatic port failover if 5000 is occupied
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 ${APP_NAME} Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Creator: Akshita Sahu (Fitwithakshita@gmail.com)`);
  console.log(`🛡️ Admin Portal: /api/admin/stats`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} is busy, failing over to port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`🚀 ${APP_NAME} Server running on port ${fallbackPort}`);
      console.log(`📡 Health Check: http://localhost:${fallbackPort}/api/health`);
    });
  } else {
    throw err;
  }
});

// Connect to MongoDB Atlas
connectDB();
