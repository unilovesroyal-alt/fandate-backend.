const mongoose = require('mongoose');

// Generate unique GPC ID
function generateGPCId() {
  return `GPC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  
  // Social connections
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // GGC Identity System (The Pulse)
  ggc: {
    gpcId: { type: String, unique: true, default: generateGPCId },
    aura: { type: Number, default: 0 },
    rank: { type: String, default: 'Rookie', enum: ['Rookie', 'Pro', 'Elite', 'Legend'] },
    exposure: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    permissions: { type: [String], default: ['public'] }
  }
}, { timestamps: true });

// Update rank based on aura (auto-calculated)
UserSchema.methods.updateRank = function() {
  if (this.ggc.aura >= 10000) this.ggc.rank = 'Legend';
  else if (this.ggc.aura >= 5000) this.ggc.rank = 'Elite';
  else if (this.ggc.aura >= 1000) this.ggc.rank = 'Pro';
  else this.ggc.rank = 'Rookie';
  return this.ggc.rank;
};

module.exports = mongoose.model('User', UserSchema);