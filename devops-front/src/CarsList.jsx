import React, { useState, useEffect } from 'react';
import { getCars } from './api';
import { Link } from 'react-router-dom';
import './styles.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        setError('Ошибка при загрузке данных');
        console.error('CarsList Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (isLoading) {
    return (
      <div className='container'>
        <h2>Список машин:</h2>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <h2>Список машин:</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h2>Список машин:</h2>
      {cars.length === 0 ? (
        <p>Список пуст.</p>
      ) : (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <Link to={`/cars/update/${car.id}`}>{car.brand}, {car.model}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cars/add">Добавить машину</Link>
    </div>
  );
};

export default CarsList;
