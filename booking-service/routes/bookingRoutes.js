const express = require('express');
const router = express.Router();
const axios = require('axios');
const Booking = require('../models/Booking');

router.post('/bookings', async (req, res) => {
  try {
    const { userId, carId, startDate, endDate } = req.body;
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.data.activeBookings >= userResponse.data.maxBookings) {
      return res.status(400).send({ message: 'User has reached the booking limit' });
    }
    const carResponse = await axios.get(`http://localhost:3002/cars/${carId}`);
    if (!carResponse.data.isAvailable) {
      return res.status(400).send({ message: 'Car is not available' });
    }
    const booking = new Booking({ userId, carId, startDate, endDate });
    await booking.save();
    await axios.put(`http://localhost:3001/users/${userId}`, {
      activeBookings: userResponse.data.activeBookings + 1,
    });
    await axios.put(`http://localhost:3002/cars/${carId}`, { isAvailable: false });

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/bookings/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    const userResponse = await axios.get(`http://localhost:3001/users/${booking.userId}`);
    await axios.put(`http://localhost:3001/users/${booking.userId}`, {
      activeBookings: userResponse.data.activeBookings - 1,
    });
    await axios.put(`http://localhost:3002/cars/${booking.carId}`, { isAvailable: true });
    booking.status = 'canceled';
    await booking.save();

    res.send({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;