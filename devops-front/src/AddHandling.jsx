import React, { useState, useEffect } from 'react';
import { addHandling } from './api';
import { getCars } from './api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const handlingTypes = [
  "Замена воздушного фильтра",
  "Замена салонного фильтра",
  "Замена масла двигателя",
  "Замена масла в КПП",
  "Замена тормозных колодок",
  "Замена тормозных дисков",
  "Замена свечей зажигания",
  "Замена антифриза",
  "Замена тормозной жидкости",
  "Замена стоек стабилизатора",
  "Замена пыльников амортизатора",
  "Замена тормозных трубок"
];

const AddHandling = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [date, setDateHandling] = useState('');
  const [cost, setCost] = useState('');
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);
      } catch (error) {
        console.error('Ошибка при загрузке автомобилей:', error);
      }
    };
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHandling({ type: selectedType, car_id: parseInt(selectedCar), date: date, cost: cost });
      navigate('/handlings');
    } catch (error) {
      console.error('Ошибка при добавлении обслуживания:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Добавить обслуживание:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Автомобиль:
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
            <option value="">Выберите автомобиль</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>{car.brand}, {car.model}, {car.year}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Тип обслуживания:
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Выберите тип обслуживания</option>
            {handlingTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Дата обслуживания:
          <input type='date' onChange={(e) => setDateHandling(e.target.value)}></input>
        </label>
        <br />
        <label>
          Стоимость обслуживания:
          <input type='number' onChange={(e) => setCost(e.target.value)}></input>
        </label>
        <br />
        <button type="submit" disabled={!selectedType || !selectedCar}>Добавить</button>
      </form>
    </div>
  );
};

export default AddHandling;
