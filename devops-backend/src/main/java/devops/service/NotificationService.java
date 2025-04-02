package devops.service;

import devops.model.Notification;
import devops.repository.NotificationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

    private NotificationRepository repository;

    public Notification createNotification(Notification notification) {
        return repository.save(notification);
    }

    public Notification activate(Long notificationId) {
        var notification = repository.getById(notificationId);
        notification.setActive(true);
        return repository.save(notification);
    }

    public Notification deactivate(Long notificationId) {
        var notification = repository.getById(notificationId);
        notification.setActive(false);
        return repository.save(notification);
    }

    public Notification updateNotification(Notification notification, Long destId) {
        var dest = repository.getById(destId);
        dest.setActive(notification.isActive());
        dest.setDate(notification.getDate());
        dest.setTypeOfNotification(notification.getTypeOfNotification());
        dest.setBindingCar(notification.getBindingCar());
        return repository.save(dest);
    }

    public void removeNotification(Long notificationId) {
        repository.deleteById(notificationId);
    }

    public Notification getNotification(Long notificationId) {
        return repository.getById(notificationId);
    }

    public List<Notification> getListNotifications() {
        return repository.findAll();
    }

}
