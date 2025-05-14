package test;

import devops.model.Car;
import devops.model.Handling;
import devops.repository.HandlingRepository;
import devops.service.HandlingService;
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
class HandlingServiceTest {

    @Mock
    private HandlingRepository repository;

    @InjectMocks
    private HandlingService handlingService;

    @Test
    void getListHandlingByCarId_shouldReturnList() {
        Long carId = 1L;
        List<Handling> expectedHandlings = Arrays.asList(new Handling(), new Handling());
        when(repository.getHandlingListByCarId(carId)).thenReturn(expectedHandlings);

        List<Handling> result = handlingService.getListHandlingByCarId(carId);

        assertEquals(expectedHandlings, result);
        verify(repository).getHandlingListByCarId(carId);
    }

    @Test
    void getListHandling_shouldReturnAll() {
        List<Handling> expectedHandlings = Arrays.asList(new Handling(), new Handling());
        when(repository.findAll()).thenReturn(expectedHandlings);

        List<Handling> result = handlingService.getListHandling();

        assertEquals(expectedHandlings, result);
        verify(repository).findAll();
    }

    @Test
    void addHandling_shouldSaveAndReturnHandling() {
        Handling handlingToSave = new Handling();
        when(repository.save(handlingToSave)).thenReturn(handlingToSave);

        Handling result = handlingService.addHandling(handlingToSave);

        assertEquals(handlingToSave, result);
        verify(repository).save(handlingToSave);
    }

    @Test
    void removeHandling_shouldDeleteHandling() {
        Long id = 1L;

        handlingService.removeHandling(id);

        verify(repository).deleteById(id);
    }
}