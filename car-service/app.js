const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/car-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(carRoutes);

module.exports = app;