import React from 'react';
import { deactivateNotification } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const DeactivateNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    try {
      await deactivateNotification(id);
      navigate('/notifications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Деактивировать уведомление {id}?</h2>
      <button onClick={handleDeactivate}>Деактивировать</button>
    </div>
  );
};

export default DeactivateNotification;
