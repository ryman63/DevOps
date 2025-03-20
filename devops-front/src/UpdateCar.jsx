import React, { useState, useEffect } from 'react';
import { getCarById, updateCar } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const UpdateCar = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const car = await getCarById(id);
      setName(car.name);
      setModel(car.model);
    };
    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar({ name, model }, id);
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
          Имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Модель:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <br />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateCar;
