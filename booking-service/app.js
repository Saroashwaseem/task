const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/booking-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bookingRoutes);

module.exports = app;