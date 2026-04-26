const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
module.exports = function auth(req, res, next) {
  // Get token from header
  const token = req.header('auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};