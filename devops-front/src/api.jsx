import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // Укажите ваш URL
});

// Контроллер машин
export const getCarById = async (id) => {
  try {
    const response = await api.get(`/api/cars/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCars = async () => {
  try {
    const response = await api.get('/api/cars/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCar = async (car) => {
  try {
    const response = await api.post('/api/cars/add', car);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCar = async (car, id) => {
  try {
    const response = await api.put(`/api/cars/update/${id}`, car);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeCar = async (id) => {
  try {
    await api.delete(`/api/cars/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// Контроллер обработок
export const addHandling = async (handling) => {
  try {
    const response = await api.post('/api/handlings/add', handling);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHandlingList = async (carId) => {
  try {
    const response = await api.get(`/api/handlings/${carId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateHandling = async (handling, handlingId) => {
  try {
    const response = await api.put(`/api/handlings/${handlingId}`, handling);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeHandling = async (id) => {
  try {
    await api.delete(`/api/handlings/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// Контроллер уведомлений
export const createNotification = async (notification) => {
  try {
    const response = await api.post('/api/notifications/create', notification);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const activateNotification = async (id) => {
  try {
    const response = await api.put(`/api/notifications/activate/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deactivateNotification = async (id) => {
  try {
    const response = await api.put(`/api/notifications/deactivate/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateNotification = async (id, notification) => {
  try {
    const response = await api.put(`/api/notifications/update/${id}`, notification);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNotification = async (id) => {
  try {
    const response = await api.get(`/api/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNotificationList = async () => {
  try {
    const response = await api.get('/api/notifications/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (id) => {
  try {
    await api.delete(`/api/notifications/${id}`);
  } catch (error) {
    console.error(error);
  }
};
