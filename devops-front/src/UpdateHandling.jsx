import React, { useState, useEffect } from 'react';
import { getHandlingList, updateHandling } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const UpdateHandling = () => {
  const { handlingId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandling = async () => {
      const handlings = await getHandlingList(1); // Пример для машины с id=1
      const handling = handlings.find((h) => h.id === parseInt(handlingId));
      if (handling) {
        setName(handling.name);
      }
    };
    fetchHandling();
  }, [handlingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHandling({ name }, handlingId);
      navigate('/handlings');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Обновить обработку:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateHandling;
