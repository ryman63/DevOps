import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddHandling, { handlingTypes } from '../AddHandling';
import { addHandling, getCars } from '../api';

// Мокаем API модули
jest.mock('../api', () => ({
  addHandling: jest.fn(),
  getCars: jest.fn()
}));

// Мокаем useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('AddHandling Component', () => {
  const mockCars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getCars.mockResolvedValue(mockCars);
    addHandling.mockResolvedValue({});
  });

  test('отображает форму добавления обслуживания', async () => {
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    expect(screen.getByText('Добавить обслуживание:')).toBeInTheDocument();
    
    // Проверяем загрузку автомобилей
    await waitFor(() => {
      expect(screen.getByText('Toyota, Corolla, 2020')).toBeInTheDocument();
      expect(screen.getByText('Honda, Civic, 2019')).toBeInTheDocument();
    });

    // Проверяем поля формы
    expect(screen.getByLabelText('Автомобиль:')).toBeInTheDocument();
    expect(screen.getByLabelText('Тип обслуживания:')).toBeInTheDocument();
    expect(screen.getByLabelText('Дата обслуживания:')).toBeInTheDocument();
    expect(screen.getByLabelText('Стоимость обслуживания:')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  test('загрузка списка автомобилей', async () => {
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getCars).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Toyota, Corolla, 2020')).toBeInTheDocument();
    });
  });

  test('отображение всех типов обслуживания', () => {
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    handlingTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });
  
/*
  test('валидация формы - кнопка неактивна при незаполненных полях', async () => {
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Добавить');
    expect(submitButton).toBeDisabled();

    // Заполняем только автомобиль
    fireEvent.change(screen.getByLabelText('Автомобиль:'), { target: { value: '1' } });
    expect(submitButton).toBeDisabled();

    // Заполняем только тип обслуживания
    fireEvent.change(screen.getByLabelText('Автомобиль:'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Тип обслуживания:'), { target: { value: handlingTypes[0] } });
    expect(submitButton).toBeDisabled();

    // Заполняем оба обязательных поля
    fireEvent.change(screen.getByLabelText('Автомобиль:'), { target: { value: '1' } });
    expect(submitButton).not.toBeDisabled();
  });


  test('успешное добавление обслуживания', async () => {
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    // Заполняем форму
    fireEvent.change(screen.getByLabelText('Автомобиль:'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Тип обслуживания:'), { target: { value: handlingTypes[0] } });
    fireEvent.change(screen.getByLabelText('Дата обслуживания:'), { target: { value: '2023-05-15' } });
    fireEvent.change(screen.getByLabelText('Стоимость обслуживания:'), { target: { value: '5000' } });

    // Отправляем форму
    fireEvent.click(screen.getByText('Добавить'));

    await waitFor(() => {
      expect(addHandling).toHaveBeenCalledWith({
        type: handlingTypes[0],
        car: { id: 1 },
        date: '2023-05-15',
        cost: '5000'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/handlings/1');
    });
  });


  test('обработка ошибки при добавлении обслуживания', async () => {
    const errorMessage = 'Ошибка сервера';
    addHandling.mockRejectedValue(new Error(errorMessage));
    
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    // Заполняем форму
    fireEvent.change(screen.getByLabelText('Автомобиль:'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Тип обслуживания:'), { target: { value: handlingTypes[0] } });

    // Отправляем форму
    fireEvent.click(screen.getByText('Добавить'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Ошибка при добавлении обслуживания:', expect.any(Error));
    });
  });


  test('обработка ошибки при загрузке автомобилей', async () => {
    getCars.mockRejectedValue(new Error('Ошибка загрузки'));
    
    render(
      <MemoryRouter>
        <AddHandling />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Ошибка при загрузке автомобилей:', expect.any(Error));
    });
  });
*/
});