import React from 'react';
import { removeCar } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const RemoveCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await removeCar(id);
      navigate('/cars');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Удалить машину {id}?</h2>
      <button onClick={handleRemove}>Удалить</button>
    </div>
  );
};

export default RemoveCar;
