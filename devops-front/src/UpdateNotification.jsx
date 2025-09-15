import React, { useState, useEffect } from 'react';
import { getNotification, updateNotification } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const UpdateNotification = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotification = async () => {
      const notification = await getNotification(id);
      setMessage(notification.message);
    };
    fetchNotification();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNotification(id, { message });
      navigate('/notifications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Обновить уведомление:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Сообщение:
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateNotification;
