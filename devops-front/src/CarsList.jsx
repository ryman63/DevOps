import React, { useState, useEffect } from 'react';
import { getCars, removeCar } from './api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);

        // Добавляем проверку на пустой список
        if (data.length === 0) {
          navigate('/cars/add');
        }
      } catch (error) {
        setError('Ошибка при загрузке данных');
        console.error('CarsList Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeCar(id);
      // Обновляем список после удаления
      const updatedCars = cars.filter(car => car.id !== id);
      setCars(updatedCars);
      
      // Если список пуст после удаления, перенаправляем на страницу добавления
      if (updatedCars.length === 0) {
        navigate('/cars/add');
      }
    } catch (error) {
      setError('Ошибка при удалении машины');
      console.error('Delete Error:', error);
    }
  };

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
        <ul className="cars-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item">
              <Link to={`/cars/update/${car.id}`}>{car.brand}, {car.model}</Link>
              <button 
                onClick={() => handleDelete(car.id)}
                className="delete-button"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cars/add" className="add-link">Добавить машину</Link>
    </div>
  );
};

export default CarsList;