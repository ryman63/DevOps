import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HandlingList from '../HandlingList';
import { getCars, getHandlingListByCar, removeHandling } from '../api';

// Мокаем API модули
jest.mock('../api', () => ({
  getCars: jest.fn(),
  getHandlingListByCar: jest.fn(),
  removeHandling: jest.fn()
}));

// Мокаем window.confirm и window.alert
global.confirm = jest.fn(() => true);
global.alert = jest.fn();

describe('HandlingList Component', () => {
  const mockCars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Honda', model: 'Civic' }
  ];

  const mockHandlings = {
    1: [
      { id: 1, type: 'ТО', date: '2023-01-15T00:00:00', cost: 5000 },
      { id: 2, type: 'Замена масла', date: '2023-03-20T00:00:00', cost: 3000 }
    ],
    2: [
      { id: 3, type: 'Диагностика', date: '2023-02-10T00:00:00', cost: 2000 }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getCars.mockResolvedValue(mockCars);
    getHandlingListByCar.mockImplementation((carId) => 
      Promise.resolve(mockHandlings[carId] || [])
    );
    removeHandling.mockResolvedValue({});
  });

  test('загрузка и отображение списка автомобилей с обслуживаниями', async () => {
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    // Проверяем заголовок
    expect(screen.getByText('Список автомобилей с обслуживаниями:')).toBeInTheDocument();

    // Ожидаем загрузку данных
    await waitFor(() => {
      expect(screen.getByText('Автомобиль Toyota Corolla')).toBeInTheDocument();
      expect(screen.getByText('Автомобиль Honda Civic')).toBeInTheDocument();
    });

    // Проверяем отображение обслуживаний
    expect(screen.getByText('ТО 2023-01-15 Стоимость: 5000')).toBeInTheDocument();
    expect(screen.getByText('Замена масла 2023-03-20 Стоимость: 3000')).toBeInTheDocument();
    expect(screen.getByText('Диагностика 2023-02-10 Стоимость: 2000')).toBeInTheDocument();

    // Проверяем кнопки
    expect(screen.getAllByText('Редактировать').length).toBe(3);
    expect(screen.getAllByText('Удалить').length).toBe(3);
    expect(screen.getAllByText('Добавить новое обслуживание для этого автомобиля').length).toBe(2);
  });

  test('отображение состояния загрузки', async () => {
    getCars.mockImplementation(() => new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    expect(screen.getByText('Список автомобилей с обслуживаниями:')).toBeInTheDocument();
    expect(screen.queryByText('Автомобиль Toyota Corolla')).not.toBeInTheDocument();
  });

  /*
  test('обработка ошибки при загрузке данных', async () => {
    getCars.mockRejectedValue(new Error('Ошибка загрузки'));
    
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Ошибка при загрузке данных:', expect.any(Error));
    });
  });

  test('удаление обслуживания', async () => {
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText('ТО 2023-01-15 Стоимость: 5000')).toBeInTheDocument();
    });

    // Находим первую кнопку удаления и кликаем
    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    // Проверяем подтверждение
    expect(global.confirm).toHaveBeenCalledWith('Вы уверены, что хотите удалить это обслуживание?');

    await waitFor(() => {
      // Проверяем вызов API удаления
      expect(removeHandling).toHaveBeenCalledWith(1);
      
      // Проверяем уведомление
      expect(global.alert).toHaveBeenCalledWith('Обслуживание успешно удалено');
      
      // Проверяем что обслуживание исчезло из списка
      expect(screen.queryByText('ТО 2023-01-15 Стоимость: 5000')).not.toBeInTheDocument();
    });
  });
  */

  /*
  test('обработка ошибки при удалении обслуживания', async () => {
    removeHandling.mockRejectedValue(new Error('Ошибка удаления'));
    
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText('ТО 2023-01-15 Стоимость: 5000')).toBeInTheDocument();
    });

    // Кликаем удалить
    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(removeHandling).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Не удалось удалить обслуживание');
      expect(console.error).toHaveBeenCalledWith('Ошибка при удалении обслуживания:', expect.any(Error));
    });
  });
  */

  test('отмена удаления обслуживания', async () => {
    global.confirm.mockImplementationOnce(() => false);
    
    render(
      <MemoryRouter>
        <HandlingList />
      </MemoryRouter>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText('ТО 2023-01-15 Стоимость: 5000')).toBeInTheDocument();
    });

    // Кликаем удалить
    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(removeHandling).not.toHaveBeenCalled();
      expect(screen.getByText('ТО 2023-01-15 Стоимость: 5000')).toBeInTheDocument();
    });
  });
});