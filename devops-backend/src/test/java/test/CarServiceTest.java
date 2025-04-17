package test;

import devops.model.Car;
import devops.repository.CarRepository;
import devops.service.CarService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarService carService;
    

    @Test
    void getCars_shouldReturnList_whenExists() throws Exception {
        List<Car> expectedCars = Arrays.asList(new Car(), new Car());
        when(carRepository.findAll()).thenReturn(expectedCars);

        List<Car> result = carService.getCars();

        assertEquals(expectedCars, result);
        verify(carRepository).findAll();
    }

    @Test
    void getCars_shouldThrowException_whenNull() {
        when(carRepository.findAll()).thenReturn(null);

        assertThrows(Exception.class, () -> carService.getCars());
    }

    @Test
    void addCar_shouldSaveAndReturnCar() {
        Car carToSave = new Car();
        when(carRepository.save(carToSave)).thenReturn(carToSave);

        Car result = carService.addCar(carToSave);

        assertEquals(carToSave, result);
        verify(carRepository).save(carToSave);
    }

    @Test
    void removeCarById_shouldDeleteCar() {
        Long id = 1L;

        carService.removeCarById(id);

        verify(carRepository).deleteById(id);
    }
}