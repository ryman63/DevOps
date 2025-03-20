import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <div className='container'>
      <h1>Главная страница</h1>
      <p>Добро пожаловать в приложение "Планировщик техобслуживания автомобиля".</p>
      <ul>
        <li>
          <Link to="/cars">Список машин</Link>
        </li>
        <li>
          <Link to="/handlings/1">Список обслуживаний</Link>
        </li>
        <li>
          <Link to="/notifications/create">Создать уведомление</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
