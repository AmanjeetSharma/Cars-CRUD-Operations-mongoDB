import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  model: String,
  company: String,
  category: String,
  price: Number,
});

const Car = mongoose.model('Car', CarSchema);
export default Car;
