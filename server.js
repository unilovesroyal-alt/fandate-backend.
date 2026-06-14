const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to the Citadel Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[CITADEL] Database Linked'))
  .catch(err => console.error('[CITADEL] Connection Failed', err));

// Fandate Routes
app.get('/', (req, res) => {
  res.send('Fandate System Online - Pulse Steady');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[FANDATE] Kernel active on port ${PORT}`);
});
