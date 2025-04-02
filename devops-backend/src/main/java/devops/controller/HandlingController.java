package devops.controller;

import devops.model.Handling;
import devops.service.HandlingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/handlings")
public class HandlingController {

    private HandlingService service;

    @PostMapping("/add")
    ResponseEntity<?> AddHandling(@RequestBody Handling handling) {
        return ResponseEntity.ok(service.addHandling(handling));
    }

    @GetMapping("/{carId}")
    ResponseEntity<?> GetHandlingList(@PathVariable Long carId) {
        return ResponseEntity.ok(service.getListHandlingByCarId(carId));
    }

    @PutMapping("/{handlingId}")
    ResponseEntity<?> UpdateHandling(@RequestBody Handling handling,@PathVariable Long handlingId) {
        return ResponseEntity.ok(service.updateHandling(handling, handlingId));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> RemoveHandling(@PathVariable Long id) {
        service.removeHandling(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{}");
    }
}
