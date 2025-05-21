import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import carRoutes from './routes/car.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cars_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/cars', carRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
