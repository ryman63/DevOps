import React from 'react';
import { removeHandling } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const RemoveHandling = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await removeHandling(id);
      navigate('/handlings');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Удалить обработку {id}?</h2>
      <button onClick={handleRemove}>Удалить</button>
    </div>
  );
};

export default RemoveHandling;
