import React from 'react';
import { deleteNotification } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const RemoveNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await deleteNotification(id);
      navigate('/notifications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Удалить уведомление {id}?</h2>
      <button onClick={handleRemove}>Удалить</button>
    </div>
  );
};

export default RemoveNotification;
