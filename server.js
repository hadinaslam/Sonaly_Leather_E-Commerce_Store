const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// ──────────────── Middleware ────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// ──────────────── Serve Static Files ────────────────
// This serves your existing HTML, CSS, JS, and images from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the Hadin Model images
app.use('/images', express.static(path.join(__dirname, 'Hadin Model')));

// ──────────────── API Routes ────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Sonaly Leather API is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ──────────────── 404 Handler ────────────────
app.use('/api/{*path}', (req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});

// ──────────────── Error Handler ────────────────
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// ──────────────── Start Server ────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🚀 Sonaly Leather Server running on http://localhost:${PORT}`);
        console.log(`📦 API available at http://localhost:${PORT}/api`);
        console.log(`🌐 Website available at http://localhost:${PORT}/index.html\n`);
    });
});
