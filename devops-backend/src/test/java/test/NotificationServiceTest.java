package test;

import devops.model.Handling;
import devops.model.Notification;
import devops.repository.CarRepository;
import devops.repository.HandlingRepository;
import devops.repository.NotificationRepository;
import devops.service.NotificationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository repository;

    @Mock
    private CarRepository carRepository;

    @Mock
    private HandlingRepository handlingRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Test
    void createNotification_shouldSaveAndReturnNotification() {
        Notification notificationToSave = new Notification();
        when(repository.save(notificationToSave)).thenReturn(notificationToSave);

        Notification result = notificationService.createNotification(notificationToSave);

        assertEquals(notificationToSave, result);
        verify(repository).save(notificationToSave);
    }


    @Test
    void removeNotification_shouldDeleteNotification() {
        Long id = 1L;

        notificationService.removeNotification(id);

        verify(repository).deleteById(id);
    }

    @Test
    void getListNotifications_shouldReturnAll() {
        List<Notification> expectedNotifications = Arrays.asList(new Notification(), new Notification());
        when(repository.findAll()).thenReturn(expectedNotifications);

        List<Notification> result = notificationService.getListNotifications();

        assertEquals(expectedNotifications, result);
        verify(repository).findAll();
    }
}