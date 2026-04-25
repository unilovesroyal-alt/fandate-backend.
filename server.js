// server.js – minimal core
const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ message: 'GGC Core Live' }));
app.listen(10000, () => console.log('Core running'));