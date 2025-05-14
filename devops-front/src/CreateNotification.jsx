import React, { use, useState, useEffect } from 'react';
import { createNotification, getHandlingList } from './api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateNotification = () => {
  const [date, setDate] = useState('');
  const [isActive, setState] = useState('');
  const [handlingId, setHandlingId] = useState('');
  const [handlings, setHandlings] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
    const fetchHandlingList = async () => {
      try {
        const handlings = await getHandlingList();
        setHandlings(handlings);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchHandlingList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedHandling = handlings.find(h => h.id === handlingId);
      const car_id = selectedHandling?.car?.id;
      setState(true);
      await createNotification({ handling: {id: handlingId},date, isActive});
      navigate('/notifications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Создать уведомление:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Дата проведения обслуживания:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <div>
        <label>Обслуживание:</label>
        <select
          value={handlingId}
          onChange={(e) => setHandlingId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Выберите обслуживание</option>
          {handlings.map((handling) => (
            <option key={handling.id} value={handling.id}>
              {handling.type} (Машина: {handling.car?.brand} {handling.car?.model})
            </option>
          ))}
        </select>
      </div>
        <br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateNotification;
