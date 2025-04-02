package test;

import devops.model.Notification;
import devops.repository.NotificationRepository;
import devops.service.NotificationService;
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
class NotificationServiceTest {

    @Mock
    private NotificationRepository repository;

    @InjectMocks
    private NotificationService notificationService;

    private Notification notification;

    @BeforeEach
    void setUp() {
        notification = new Notification();
        notification.setId(1L);
        notification.setActive(false);
        notification.setTypeOfNotification("Service Reminder");
    }

    @Test
    void testCreateNotification() {
        when(repository.save(notification)).thenReturn(notification);
        Notification savedNotification = notificationService.createNotification(notification);

        assertNotNull(savedNotification);
        assertEquals("Service Reminder", savedNotification.getTypeOfNotification());
    }

    @Test
    void testActivateNotification() {
        when(repository.getById(1L)).thenReturn(notification);
        when(repository.save(any(Notification.class))).thenReturn(notification);

        Notification activated = notificationService.activate(1L);

        assertTrue(activated.isActive());
    }

    @Test
    void testDeactivateNotification() {
        notification.setActive(true);
        when(repository.getById(1L)).thenReturn(notification);
        when(repository.save(any(Notification.class))).thenReturn(notification);

        Notification deactivated = notificationService.deactivate(1L);

        assertFalse(deactivated.isActive());
    }

    @Test
    void testUpdateNotification() {
        Notification updatedNotification = new Notification();
        updatedNotification.setActive(true);
        updatedNotification.setTypeOfNotification("Insurance Reminder");

        when(repository.getById(1L)).thenReturn(notification);
        when(repository.save(any(Notification.class))).thenReturn(updatedNotification);

        Notification result = notificationService.updateNotification(updatedNotification, 1L);

        assertNotNull(result);
        assertEquals("Insurance Reminder", result.getTypeOfNotification());
    }

    @Test
    void testRemoveNotification() {
        doNothing().when(repository).deleteById(1L);
        assertDoesNotThrow(() -> notificationService.removeNotification(1L));
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testGetNotification() {
        when(repository.getById(1L)).thenReturn(notification);
        Notification result = notificationService.getNotification(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testGetListNotifications() {
        List<Notification> notifications = Arrays.asList(notification, new Notification());
        when(repository.findAll()).thenReturn(notifications);

        List<Notification> result = notificationService.getListNotifications();

        assertNotNull(result);
        assertEquals(2, result.size());
    }
}
