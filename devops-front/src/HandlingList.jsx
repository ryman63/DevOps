import React, { useState, useEffect } from 'react';
import { getCars, getHandlingListByCar, removeHandling } from './api';
import { Link } from 'react-router-dom';
import './styles.css';

const HandlingList = () => {
  const [cars, setCars] = useState([]);
  const [handlings, setHandlings] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const carsData = await getCars();
      setCars(carsData);

      const handlingsData = {};
      for (const car of carsData) {
        const carHandlings = await getHandlingListByCar(car.id);
        handlingsData[car.id] = carHandlings;
      }
      setHandlings(handlingsData);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const handleDelete = async (handlingId, carId) => {
    try {
      if (window.confirm('Вы уверены, что хотите удалить это обслуживание?')) {
        await removeHandling(handlingId);
        const updatedHandlings = { ...handlings };
        updatedHandlings[carId] = updatedHandlings[carId].filter(
          (h) => h.id !== handlingId
        );
        setHandlings(updatedHandlings);
        alert('Обслуживание успешно удалено');
      }
    } catch (error) {
      console.error('Ошибка при удалении обслуживания:', error);
      alert('Не удалось удалить обслуживание');
    }
  };

  return (
    <div className='container'>
      <h2>Список автомобилей с обслуживаниями:</h2>
      {cars.map((car) => (
        <div key={car.id}>
          <h3>Автомобиль {car.brand} {car.model}</h3>
          <ul className="handling-list">
            {handlings[car.id] && handlings[car.id].map((handling) => (
              <li key={handling.id} className="handling-item">
                <span className="handling-info">
                  {handling.type} {handling.date.split('T')[0]} Стоимость: {handling.cost}
                </span>
                <div className="handling-actions">
                  <Link 
                    to={`/handlings/update/${handling.id}`} 
                    className="edit-button"
                  >
                    Редактировать
                  </Link>
                  <button 
                    onClick={() => handleDelete(handling.id, car.id)}
                    className="delete-button"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <Link to={`/handlings/add?carId=${car.id}`} className="add-button">
              Добавить новое обслуживание для этого автомобиля
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default HandlingList;