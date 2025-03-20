import React from 'react';
import { activateNotification } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const ActivateNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleActivate = async () => {
    try {
      await activateNotification(id);
      navigate('/notifications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Активировать уведомление {id}?</h2>
      <button onClick={handleActivate}>Активировать</button>
    </div>
  );
};

export default ActivateNotification;
