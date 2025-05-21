import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ model: '', company: '', category: '', price: '' });
  const [editingCarId, setEditingCarId] = useState(null);

  const fetchCars = async () => {
    const res = await axios.get('http://localhost:5000/api/cars');
    setCars(res.data);
  };

  const addCar = async () => {
    await axios.post('http://localhost:5000/api/cars', form);
    setForm({ model: '', company: '', category: '', price: '' });
    fetchCars();
  };

  const updateCar = async () => {
    await axios.put(`http://localhost:5000/api/cars/${editingCarId}`, form);
    setEditingCarId(null);
    setForm({ model: '', company: '', category: '', price: '' });
    fetchCars();
  };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`);
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚗 Car Manager</h1>
      <div className="flex gap-8">
        {/* Car List on the left */}
        <ul className="space-y-2 flex-1">
          {cars.map((car) => (
            <li key={car._id} className="border p-3 flex justify-between items-center">
              <div>
                <strong>{car.model}</strong> ({car.company})<br />
                {car.category} - ${car.price}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setForm(car);
                    setEditingCarId(car._id);
                  }}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button onClick={() => deleteCar(car._id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/* Input Form on the right */}
        <div className="space-y-2 mb-4 w-80">
          <input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full border p-2"
          />
          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border p-2"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border p-2"
          />
          {editingCarId ? (
            <button onClick={updateCar} className="bg-yellow-500 text-white px-4 py-2 w-full">
              Update Car
            </button>
          ) : (
            <button onClick={addCar} className="bg-blue-500 text-white px-4 py-2 w-full">
              Add Car
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
