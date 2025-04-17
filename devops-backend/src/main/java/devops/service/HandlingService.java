package devops.service;

import devops.model.Handling;
import devops.repository.HandlingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HandlingService {

    private HandlingRepository repository;

    public List<Handling> getListHandlingByCarId(Long carId){
        return repository.getHandlingListByCarId(carId);
    }

    public List<Handling> getListHandling() {
        return repository.findAll();
    }

    public Handling getHandlingById(Long id){
        return repository.getById(id);
    }

    public Handling addHandling(Handling handling) {
        return repository.save(handling);
    }

    public void removeHandling(Long handlingId) {
        repository.deleteById(handlingId);
    }

    public Handling updateHandling(Handling handling,Long destId) {
        var dest = repository.getById(destId);
        dest.setCar(handling.getCar());
        dest.setDate(handling.getDate());
        dest.setCost(handling.getCost());
        dest.setType(handling.getType());
        return repository.save(dest);
    }
}
