package test;

import devops.model.Handling;
import devops.repository.HandlingRepository;
import devops.service.HandlingService;
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
class HandlingServiceTest {

    @Mock
    private HandlingRepository repository;

    @InjectMocks
    private HandlingService handlingService;

    private Handling handling;

    @BeforeEach
    void setUp() {
        handling = new Handling();
        handling.setId(1L);
        handling.setCost(1000);
        handling.setType("Maintenance");
    }

    @Test
    void testGetListHandlingByCarId() {
        List<Handling> handlings = Arrays.asList(handling, new Handling());
        when(repository.getHandlingListByCarId(1L)).thenReturn(handlings);

        List<Handling> result = handlingService.getListHandlingByCarId(1L);

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    void testAddHandling() {
        when(repository.save(handling)).thenReturn(handling);
        Handling savedHandling = handlingService.addHandling(handling);

        assertNotNull(savedHandling);
        assertEquals(1000.0, savedHandling.getCost());
    }

    @Test
    void testRemoveHandling() {
        doNothing().when(repository).deleteById(1L);
        assertDoesNotThrow(() -> handlingService.removeHandling(1L));
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testUpdateHandling() {
        Handling updatedHandling = new Handling();
        updatedHandling.setCost(1500);
        updatedHandling.setType("Repair");

        when(repository.getById(1L)).thenReturn(handling);
        when(repository.save(any(Handling.class))).thenReturn(updatedHandling);

        Handling result = handlingService.updateHandling(updatedHandling, 1L);

        assertNotNull(result);
        assertEquals(1500, result.getCost());
    }
}
