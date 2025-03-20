import React, { useState, useEffect } from 'react';
import { getCars, getHandlingList } from './api';
import { Link } from 'react-router-dom';
import './styles.css';

const HandlingList = () => {
  const [cars, setCars] = useState([]);
  const [handlings, setHandlings] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);

        // Получаем список обслуживаний для каждой машины
        const handlingsData = {};
        for (const car of carsData) {
          const carHandlings = await getHandlingList(car.id);
          handlingsData[car.id] = carHandlings;
        }
        setHandlings(handlingsData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className='container'>
      <h2>Список автомобилей с обслуживаниями:</h2>
      {cars.map((car) => (
        <div key={car.id}>
          <h3>Автомобиль {car.name} (ID: {car.id})</h3>
          <ul>
            {handlings[car.id] && handlings[car.id].map((handling) => (
              <li key={handling.id}>{handling.name}</li>
            ))}
          </ul>
          <p>
            <Link to={`/handlings/add?carId=${car.id}`}>
              Добавить новое обслуживание для этого автомобиля
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default HandlingList;
