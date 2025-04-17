import React, { useState, useEffect } from 'react';
import { getHandling, updateHandling } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import { handlingTypes } from './AddHandling';
import './styles.css';

const UpdateHandling = () => {
  const { handlingId } = useParams();
  const [date, setDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [cost, setCost] = useState('');
  const [carId, setCarId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandling = async () => {
      const handling = await getHandling(handlingId);
      if (handling) {
        setDate(handling.date);
        setSelectedType(handling.type);
        setCost(handling.cost);
        setCarId(handling.car.id);
      }
    };
    fetchHandling();
  }, [handlingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHandling({car:{id:parseInt(carId)}, date, type:selectedType, cost }, handlingId);
      navigate('/handlings/:${car.id}');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Обновить запись об обслуживании:</h2>
      <form onSubmit={handleSubmit}>
      <label style={{display:"none"}}>
          Идентификтор машины:
          <input type="number" value={carId}  onChange={(e) => setCarId(e.target.value)}/>
        </label>
        <label>
          Дата:
          <input type="date" value={date.split("T")[0]} onChange={(e) => setDate(e.target.value)} />
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
          Стоимость:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
        </label>
        <br />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateHandling;
