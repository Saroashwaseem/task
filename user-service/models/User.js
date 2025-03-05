const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  maxBookings: { type: Number, default: 3 },
  activeBookings: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);