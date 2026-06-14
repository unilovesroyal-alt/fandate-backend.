const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Connect to the Citadel Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('[CITADEL] Database Connected'))
    .catch(err => console.error('[CITADEL] Connection Error:', err));

// 2. Fandate Root Route (The Gateway)
app.get('/', (req, res) => {
    res.send('Fandate System Online - Pulse Steady');
});

// 3. Keep your Kernel listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FANDATE] Kernel active on port ${PORT}`);
});
