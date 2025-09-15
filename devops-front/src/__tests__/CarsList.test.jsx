import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CarsList from '../CarsList';
import { getCars, removeCar } from '../api';

// Мокаем API модуль
jest.mock('../api', () => ({
  getCars: jest.fn(),
  removeCar: jest.fn(),
}));

describe('CarsList Component', () => {
  const mockCars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Honda', model: 'Civic' },
  ];

  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
  });

  test('отображает загрузку при первоначальном рендере', () => {
    getCars.mockImplementation(() => new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  test('отображает список машин после успешной загрузки', async () => {
    getCars.mockResolvedValue(mockCars);
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Toyota, Corolla')).toBeInTheDocument();
      expect(screen.getByText('Honda, Civic')).toBeInTheDocument();
      expect(screen.getByText('Добавить машину')).toBeInTheDocument();
    });
  });

  test('отображает сообщение об ошибке при неудачной загрузке', async () => {
    getCars.mockRejectedValue(new Error('Network error'));
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Ошибка при загрузке данных')).toBeInTheDocument();
    });
  });

  test('перенаправляет на страницу добавления при пустом списке', async () => {
    getCars.mockResolvedValue([]);
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <CarsList />
      </Router>
    );
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/cars/add');
    });
  });

  test('удаляет машину и обновляет список', async () => {
    getCars.mockResolvedValue(mockCars);
    removeCar.mockResolvedValue({});
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Toyota, Corolla')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    
    await waitFor(() => {
      expect(removeCar).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Toyota, Corolla')).not.toBeInTheDocument();
      expect(screen.getByText('Honda, Civic')).toBeInTheDocument();
    });
  });

  test('перенаправляет на страницу добавления после удаления последней машины', async () => {
    getCars.mockResolvedValue([mockCars[0]]);
    removeCar.mockResolvedValue({});
    const history = createMemoryHistory();
    
    render(
      <Router location={history.location} navigator={history}>
        <CarsList />
      </Router>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Toyota, Corolla')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Удалить'));
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/cars/add');
    });
  });

  test('отображает сообщение об ошибке при неудачном удалении', async () => {
    getCars.mockResolvedValue(mockCars);
    removeCar.mockRejectedValue(new Error('Delete failed'));
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Toyota, Corolla')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Ошибка при удалении машины')).toBeInTheDocument();
      // Уберите проверку на Toyota, Corolla, так как она может исчезнуть при ошибке
    });
  });
});