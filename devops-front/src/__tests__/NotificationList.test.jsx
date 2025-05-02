import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotificationList from '../NotificationList';
import { getNotificationList, deleteNotification } from '../api';

// Мокаем API модули
jest.mock('../api', () => ({
  getNotificationList: jest.fn(),
  deleteNotification: jest.fn()
}));

// Мокаем window.confirm и window.alert
global.confirm = jest.fn(() => true);
global.alert = jest.fn();

describe('NotificationList Component', () => {
  const mockNotifications = [
    {
      id: 1,
      date: '2023-05-15T00:00:00',
      handling: { type: 'Замена масла' }
    },
    {
      id: 2,
      date: '2023-06-20T00:00:00',
      handling: { type: 'Технический осмотр' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('отображает состояние загрузки', () => {
    getNotificationList.mockImplementation(() => new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Список уведомлений:')).toBeInTheDocument();
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  /*
  test('отображает список уведомлений после загрузки', async () => {
    getNotificationList.mockResolvedValue(mockNotifications);
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
      expect(screen.getByText('Технический осмотр, 20.06.2023')).toBeInTheDocument();
      expect(screen.getByText('Создать новое уведомление')).toBeInTheDocument();
    });
  });
  */

  test('отображает сообщение об ошибке при неудачной загрузке', async () => {
    getNotificationList.mockRejectedValue(new Error('Network error'));
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Ошибка при загрузке данных')).toBeInTheDocument();
    });
  });

  test('перенаправляет на страницу создания при пустом списке', async () => {
    getNotificationList.mockResolvedValue([]);
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <NotificationList />
      </Router>
    );
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/notifications/create');
    });
  });

  /*
  test('удаляет уведомление при подтверждении', async () => {
    getNotificationList.mockResolvedValue(mockNotifications);
    deleteNotification.mockResolvedValue({});
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    
    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith('Вы уверены, что хотите удалить это уведомление?');
      expect(deleteNotification).toHaveBeenCalledWith(1);
      expect(global.alert).toHaveBeenCalledWith('Уведомление успешно удалено');
      expect(screen.queryByText('Замена масла, 15.05.2023')).not.toBeInTheDocument();
    });
  });

  test('не удаляет уведомление при отмене подтверждения', async () => {
    getNotificationList.mockResolvedValue(mockNotifications);
    global.confirm.mockImplementationOnce(() => false);
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    
    await waitFor(() => {
      expect(deleteNotification).not.toHaveBeenCalled();
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
    });
  });

  test('обрабатывает ошибку при удалении уведомления', async () => {
    getNotificationList.mockResolvedValue(mockNotifications);
    deleteNotification.mockRejectedValue(new Error('Delete failed'));
    
    render(
      <MemoryRouter>
        <NotificationList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Не удалось удалить уведомление');
      expect(console.error).toHaveBeenCalledWith('Ошибка при удалении уведомления:', expect.any(Error));
      expect(screen.getByText('Замена масла, 15.05.2023')).toBeInTheDocument();
    });
  });
  */
});