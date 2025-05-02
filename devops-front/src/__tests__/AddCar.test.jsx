import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddCar from '../AddCar';
import { addCar } from '../api';
import userEvent from '@testing-library/user-event';
// Мокаем API модуль
jest.mock('../api', () => ({
  addCar: jest.fn(),
}));

// Мокаем useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Игнорируем предупреждения React Router
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('AddCar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('отображает форму добавления машины', () => {
    render(
      <MemoryRouter>
        <AddCar />
      </MemoryRouter>
    );

    expect(screen.getByText('Добавить машину')).toBeInTheDocument();
    expect(screen.getByLabelText('Бренд*:')).toBeInTheDocument();
    expect(screen.getByLabelText('Модель*:')).toBeInTheDocument();
    expect(screen.getByLabelText('VIN-код*:')).toBeInTheDocument();
    expect(screen.getByText('Добавить автомобиль')).toBeInTheDocument();
  });

  test('обработка изменений в полях формы', () => {
    render(
      <MemoryRouter>
        <AddCar />
      </MemoryRouter>
    );

    const brandInput = screen.getByLabelText('Бренд*:');
    const modelInput = screen.getByLabelText('Модель*:');
    const mileageInput = screen.getByLabelText('Пробег (км):');

    fireEvent.change(brandInput, { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(modelInput, { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(mileageInput, { target: { name: 'mileage', value: '10000' } });

    expect(brandInput.value).toBe('Toyota');
    expect(modelInput.value).toBe('Corolla');
    expect(mileageInput.value).toBe('10000');
  });

  test('успешное добавление машины', async () => {
    addCar.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AddCar />
      </MemoryRouter>
    );

    // Заполняем обязательные поля
    fireEvent.change(screen.getByLabelText('Бренд*:'), { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText('Модель*:'), { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText('VIN-код*:'), { target: { name: 'vin', value: 'XTA210997654321' } });

    fireEvent.click(screen.getByText('Добавить автомобиль'));

    await waitFor(() => {
      expect(addCar).toHaveBeenCalledWith({
        brand: 'Toyota',
        model: 'Corolla',
        year: null,
        mileage: null,
        vin: 'XTA210997654321'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/cars');
    });
  });

  test('обработка ошибки при добавлении машины', async () => {
    const errorMessage = 'Ошибка сервера';
    addCar.mockRejectedValue({ response: { data: { message: errorMessage } } });

    render(
      <MemoryRouter>
        <AddCar />
      </MemoryRouter>
    );

    // Заполняем обязательные поля
    fireEvent.change(screen.getByLabelText('Бренд*:'), { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText('Модель*:'), { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText('VIN-код*:'), { target: { name: 'vin', value: 'XTA210997654321' } });

    fireEvent.click(screen.getByText('Добавить автомобиль'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('преобразование данных перед отправкой', async () => {
    addCar.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AddCar />
      </MemoryRouter>
    );

    // Заполняем все поля
    fireEvent.change(screen.getByLabelText('Бренд*:'), { target: { name: 'brand', value: ' Toyota ' } });
    fireEvent.change(screen.getByLabelText('Модель*:'), { target: { name: 'model', value: ' Corolla ' } });
    fireEvent.change(screen.getByLabelText('Дата выпуска:'), { target: { name: 'year', value: '2020-01-01' } });
    fireEvent.change(screen.getByLabelText('Пробег (км):'), { target: { name: 'mileage', value: '15000' } });
    fireEvent.change(screen.getByLabelText('VIN-код*:'), { target: { name: 'vin', value: ' XTA210997654321 ' } });

    fireEvent.click(screen.getByText('Добавить автомобиль'));

    await waitFor(() => {
      expect(addCar).toHaveBeenCalledWith({
        brand: 'Toyota', // trim()
        model: 'Corolla', // trim()
        year: '2020-01-01',
        mileage: 15000, // преобразуется в число
        vin: 'XTA210997654321' // trim()
      });
    });
  });
});