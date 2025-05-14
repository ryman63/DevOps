import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateNotification from '../CreateNotification';
import { createNotification, getHandlingList } from '../api';

// Мокаем API модули
jest.mock('../api', () => ({
  createNotification: jest.fn(),
  getHandlingList: jest.fn()
}));

// Мокаем useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('CreateNotification Component', () => {
  const mockHandlings = [
    {
      id: 1,
      type: 'Замена масла',
      date: '2023-05-15',
      cost: 5000,
      car: { id: 1, brand: 'Toyota', model: 'Corolla' }
    },
    {
      id: 2,
      type: 'Технический осмотр',
      date: '2023-06-20',
      cost: 3000,
      car: { id: 2, brand: 'Honda', model: 'Civic' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getHandlingList.mockResolvedValue(mockHandlings);
    createNotification.mockResolvedValue({});
  });

  test('отображает форму создания уведомления', async () => {
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    expect(screen.getByText('Создать уведомление:')).toBeInTheDocument();
    expect(screen.getByLabelText('Дата проведения обслуживания:')).toBeInTheDocument();
    expect(screen.getByText('Обслуживание:')).toBeInTheDocument();
    expect(screen.getByText('Создать')).toBeInTheDocument();

    // Проверяем загрузку списка обслуживаний
    await waitFor(() => {
      expect(screen.getByText('Замена масла (Машина: Toyota Corolla)')).toBeInTheDocument();
      expect(screen.getByText('Технический осмотр (Машина: Honda Civic)')).toBeInTheDocument();
    });
  });

  test('загрузка списка обслуживаний', async () => {
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getHandlingList).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Замена масла (Машина: Toyota Corolla)')).toBeInTheDocument();
    });
  });

  /*
  test('валидация формы - кнопка неактивна при незаполненных полях', async () => {
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Создать');
    expect(submitButton).toBeDisabled();

    // Заполняем только дату
    fireEvent.change(screen.getByLabelText('Дата проведения обслуживания:'), { 
      target: { value: '2023-07-01' } 
    });
    expect(submitButton).toBeDisabled();

    // Заполняем только обслуживание
    fireEvent.change(screen.getByLabelText('Дата проведения обслуживания:'), { 
      target: { value: '' } 
    });
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: '1' } 
    });
    expect(submitButton).not.toBeDisabled();
  });

  test('успешное создание уведомления', async () => {
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText('Замена масла (Машина: Toyota Corolla)')).toBeInTheDocument();
    });

    // Заполняем форму
    fireEvent.change(screen.getByLabelText('Дата проведения обслуживания:'), { 
      target: { value: '2023-07-01' } 
    });
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: '1' } 
    });

    // Отправляем форму
    fireEvent.click(screen.getByText('Создать'));

    await waitFor(() => {
      expect(createNotification).toHaveBeenCalledWith({
        handling: { id: 1 },
        date: '2023-07-01',
        isActive: true
      });
      expect(mockNavigate).toHaveBeenCalledWith('/notifications');
    });
  });

  test('обработка ошибки при создании уведомления', async () => {
    const errorMessage = 'Ошибка сервера';
    createNotification.mockRejectedValue(new Error(errorMessage));
    
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText('Замена масла (Машина: Toyota Corolla)')).toBeInTheDocument();
    });

    // Заполняем форму
    fireEvent.change(screen.getByLabelText('Дата проведения обслуживания:'), { 
      target: { value: '2023-07-01' } 
    });
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: '1' } 
    });

    // Отправляем форму
    fireEvent.click(screen.getByText('Создать'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  test('обработка ошибки при загрузке списка обслуживаний', async () => {
    getHandlingList.mockRejectedValue(new Error('Ошибка загрузки'));
    
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Ошибка при загрузке данных:', expect.any(Error));
    });
  });
  */
});