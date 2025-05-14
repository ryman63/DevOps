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

    @GetMapping("/{id}")
    ResponseEntity<?> GetHandling(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getHandlingById(id));
    }

    @GetMapping("/car/{carId}")
    ResponseEntity<?> GetHandlingListByCar(@PathVariable("carId") Long carId) {
        return ResponseEntity.ok(service.getListHandlingByCarId(carId));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> UpdateHandling(@RequestBody Handling handling,@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.updateHandling(handling, id));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> RemoveHandling(@PathVariable("id") Long id) {
        service.removeHandling(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{}");
    }

    @GetMapping("/")
    ResponseEntity<?> GetHandlingList() {
        return ResponseEntity.ok(service.getListHandling());
    }
}
