import React, { useState } from 'react';
import { createNotification } from './api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateNotification = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotification({ message });
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
          Сообщение:
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateNotification;
