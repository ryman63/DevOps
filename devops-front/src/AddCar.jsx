import React, { useState } from 'react';
import { addCar } from './api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const AddCar = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    vin: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || '' : 
             name === 'mileage' ? parseInt(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация полей
    if (!formData.brand || !formData.model || !formData.vin) {
      setError('Пожалуйста, заполните все обязательные поля (Бренд, Модель и VIN)');
      return;
    }

    try {
      const carData = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: formData.year || null,
        mileage: formData.mileage || null,
        vin: formData.vin.trim()
      };

      await addCar(carData);
      navigate('/cars');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при добавлении машины');
      console.error('AddCar Error:', err);
    }
  };

  return (
    <div className='container'>
      <h2>Добавить машину</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Бренд*:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Модель*:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Дата выпуска:
            <input
              type="date"
              name="year"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Пробег (км):
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              min="0"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            VIN-код*:
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              required

            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Добавить автомобиль
        </button>
      </form>
    </div>
  );
};

export default AddCar;
