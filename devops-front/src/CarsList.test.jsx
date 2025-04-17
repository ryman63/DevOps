import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarsList from './CarsList';
import { getCars, removeCar } from './api';

// Мокаем API модуль
jest.mock('./api');

describe('CarsList Component', () => {
  const mockCars = [
    { id: 1, brand: 'Toyota', model: 'Camry' },
    { id: 2, brand: 'Honda', model: 'Civic' }
  ];

  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    getCars.mockImplementation(() => new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  test('displays cars list after loading', async () => {
    getCars.mockResolvedValue(mockCars);
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Toyota, Camry')).toBeInTheDocument();
      expect(screen.getByText('Honda, Civic')).toBeInTheDocument();
    });
  });

  test('shows error message when API fails', async () => {
    getCars.mockRejectedValue(new Error('API Error'));
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Ошибка при загрузке данных')).toBeInTheDocument();
    });
  });

  test('displays empty list message when no cars', async () => {
    getCars.mockResolvedValue([]);
    
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Список пуст.')).toBeInTheDocument();
    });
  });
});