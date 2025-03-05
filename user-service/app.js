const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/user-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(userRoutes);

module.exports = app;