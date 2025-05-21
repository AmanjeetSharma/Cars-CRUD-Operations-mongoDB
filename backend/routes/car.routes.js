import express from 'express';
import Car from '../models/car.model.js';

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  const cars = await Car.find();
  console.log(cars);
  res.json(cars);
});

// Add a car
router.post('/', async (req, res) => {
  const newCar = new Car(req.body);
  const saved = await newCar.save();
  res.json(saved);
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  const deleted = await Car.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

export default router;
