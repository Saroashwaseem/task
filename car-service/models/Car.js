const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  location: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Car', carSchema);