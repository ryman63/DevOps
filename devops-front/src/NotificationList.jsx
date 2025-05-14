import React, { useState, useEffect } from 'react';
import { getNotificationList, deleteNotification } from './api';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData = await getNotificationList();
        setNotifications(notificationsData);

        if (notificationsData.length === 0) {
          navigate('/notifications/create');
        }
      } catch (error) {
        setError('Ошибка при загрузке данных');
        console.error('NotificationsList Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [navigate]);

  const handleDelete = async (notificationId) => {
    try {
      if (window.confirm('Вы уверены, что хотите удалить это уведомление?')) {
        await deleteNotification(notificationId);
        setNotifications(notifications.filter(n => n.id !== notificationId));
        alert('Уведомление успешно удалено');
      }
    } catch (error) {
      console.error('Ошибка при удалении уведомления:', error);
      alert('Не удалось удалить уведомление');
    }
  };

  if (isLoading) {
    return (
      <div className='container'>
        <h2>Список уведомлений:</h2>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <h2>Список уведомлений:</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h2>Список уведомлений:</h2>
      
      {notifications.length === 0 ? (
        <p>Список пуст.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-info">
                {notification.handling.type}, {new Date(notification.date).toLocaleDateString()}
              </div>
              <div className="notification-actions">
                <Link 
                  to={`/notifications/update/${notification.id}`}
                  className="edit-button"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="delete-button"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <Link to="/notifications/create" className="add-button">
        Создать новое уведомление
      </Link>
    </div>
  );
};

export default NotificationList;