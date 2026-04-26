require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const gpcRoutes = require('./routes/gpc');
const battleRoutes = require('./routes/battles');
const inventoryRoutes = require('./routes/inventory');

// Import PA Debugger
const { pa } = require('./pa-debugger.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    pa.emit('SYSTEM', 'DB_CONNECTED', { status: 'success' }, 'POSITIVE');
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err);
    pa.emit('SYSTEM', 'DB_ERROR', { error: err.message }, 'NEGATIVE');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gpc', gpcRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/inventory', inventoryRoutes);

// Frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/feed', (req, res) => res.sendFile(path.join(__dirname, 'public', 'feed.html')));
app.get('/camm', (req, res) => res.sendFile(path.join(__dirname, 'public', 'camm.html')));
app.get('/colts', (req, res) => res.sendFile(path.join(__dirname, 'public', 'colts.html')));

// Health check (for Render)
app.get('/health', (req, res) => res.json({ status: 'alive', timestamp: Date.now() }));

// ⚠️ THIS IS THE CRITICAL PART FOR RENDER ⚠️
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 GGC Universe running on port ${PORT}`);
  pa.emit('SYSTEM', 'SERVER_START', { port: PORT, host: '0.0.0.0' }, 'POSITIVE');
});