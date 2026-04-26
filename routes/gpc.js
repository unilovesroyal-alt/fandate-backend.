const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username avatarUrl ggc');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      username: user.username,
      avatar: user.avatarUrl,
      gpcId: user.ggc.gpcId,
      aura: user.ggc.aura,
      rank: user.ggc.rank,
      exposure: user.ggc.exposure,
      earnings: user.ggc.earnings,
      permissions: user.ggc.permissions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;