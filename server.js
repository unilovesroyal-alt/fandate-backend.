const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB using your environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.get('/', (req, res) => res.json({ message: 'GGC Core Live' }));

app.listen(10000, () => console.log('Core running'));