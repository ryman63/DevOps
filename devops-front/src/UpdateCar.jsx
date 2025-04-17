import React, { useState, useEffect } from 'react';
import { getCarById, updateCar } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const UpdateCar = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [vin, setVIN] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const car = await getCarById(id);
      setBrand(car.brand);
      setModel(car.model);
      setYear(car.year);
      setMileage(car.mileage);
      setVIN(car.vin);
    };
    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar({ brand, model, year, mileage, vin }, id);
      navigate('/cars');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Обновить машину:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Бренд:
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </label>
        <br />
        <label>
          Модель:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <br />
        <label>
          Год:
          <input type="date" value={year.split('T')[0]} onChange={(e) => setYear(e.target.value)} />
        </label>
        <br />
        <label>
          Пробег:
          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </label>
        <br />
        <label>
          VIN:
          <input type="text" value={vin} onChange={(e) => setVIN(e.target.value)} />
        </label>
        <br />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateCar;
