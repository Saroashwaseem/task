const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
router.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/cars/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put('/cars/:carId', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.carId,
      { isAvailable: req.body.isAvailable },
      { new: true }
    );
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;