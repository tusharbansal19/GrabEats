const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dishesRouter = require('./routes/dishes');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/grabeats', dishesRouter);
app.use('/grabeats/mycart', cartRouter);
app.use('/auth', authRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GrabEats API Server is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GrabEats API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      dishes: '/grabeats/get',
      cart: '/grabeats/mycart/get',
      auth: '/auth/login'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GrabEats API Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🍽️  Dishes API: http://localhost:${PORT}/grabeats/get`);
  console.log(`🛒 Cart API: http://localhost:${PORT}/grabeats/mycart/get`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/auth/login`);
});

module.exports = app; 