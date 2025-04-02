package test;

import devops.model.Car;
import devops.repository.CarRepository;
import devops.service.CarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarService carService;

    private Car car;

    @BeforeEach
    void setUp() {
        car = new Car();
        car.setId(1L);
        car.setBrand("Toyota");
        car.setModel("Corolla");
        car.setYear(2020);
        car.setVIN("123456789ABCDEFG");
        car.setMileage(50000);
    }

    @Test
    void testGetCarByIdSuccess() throws Exception {
        when(carRepository.getById(1L)).thenReturn(car);
        Car foundCar = carService.getCarById(1L);
        assertNotNull(foundCar);
        assertEquals("Toyota", foundCar.getBrand());
    }

    @Test
    void testGetCarByIdNotFound() {
        when(carRepository.getById(2L)).thenReturn(null);
        Exception exception = assertThrows(Exception.class, () -> carService.getCarById(2L));
        assertEquals("Car not found", exception.getMessage());
    }

    @Test
    void testGetCarsSuccess() throws Exception {
        List<Car> cars = Arrays.asList(car, new Car());
        when(carRepository.findAll()).thenReturn(cars);
        List<Car> result = carService.getCars();
        assertFalse(result.isEmpty());
        assertEquals(2, result.size());
    }

    @Test
    void testGetCarsNull() {
        when(carRepository.findAll()).thenReturn(null);
        Exception exception = assertThrows(Exception.class, carService::getCars);
        assertEquals("Cars is null", exception.getMessage());
    }

    @Test
    void testAddCar() {
        when(carRepository.save(car)).thenReturn(car);
        Car savedCar = carService.addCar(car);
        assertNotNull(savedCar);
        assertEquals("Toyota", savedCar.getBrand());
    }

    @Test
    void testUpdateCar() {
        Car updatedCar = new Car();
        updatedCar.setBrand("Honda");
        updatedCar.setModel("Civic");
        updatedCar.setYear(2021);
        updatedCar.setVIN("987654321ABCDEFG");
        updatedCar.setMileage(30000);

        when(carRepository.getById(1L)).thenReturn(car);
        when(carRepository.save(any(Car.class))).thenReturn(updatedCar);

        Car result = carService.updateCar(updatedCar, 1L);
        assertNotNull(result);
        assertEquals("Honda", result.getBrand());
        assertEquals("Civic", result.getModel());
    }

    @Test
    void testRemoveCarById() {
        doNothing().when(carRepository).deleteById(1L);
        assertDoesNotThrow(() -> carService.removeCarById(1L));
        verify(carRepository, times(1)).deleteById(1L);
    }
}
