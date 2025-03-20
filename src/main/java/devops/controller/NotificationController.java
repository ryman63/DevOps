package devops.controller;

import devops.model.Notification;
import devops.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private NotificationService service;

    @PostMapping("/create")
    ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(service.createNotification(notification));
    }

    @PutMapping("/activate/{id}")
    ResponseEntity<?> activateNotification(@PathVariable Long id) {
        return ResponseEntity.ok(service.activate(id));
    }

    @PutMapping("/deactivate/{id}")
    ResponseEntity<?> deactivateNotification(@PathVariable Long id) {
        return ResponseEntity.ok(service.deactivate(id));
    }

    @PutMapping("/update/{id}")
    ResponseEntity<?> updateNotification(@PathVariable Long id, @RequestBody Notification notification) {
        return ResponseEntity.ok(service.updateNotification(notification, id));
    }

    @GetMapping("/{id}")
    ResponseEntity<?> getNotification(@PathVariable Long id) {
        return ResponseEntity.ok(service.getNotification(id));
    }

    @GetMapping("/")
    ResponseEntity<?> getNotificationList() {
        return ResponseEntity.ok(service.getListNotifications());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        service.removeNotification(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{}");
    }
}
