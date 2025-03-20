package devops.service;

import devops.model.Car;
import devops.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CarService {

    private CarRepository carRepository;

    public Car getCarById(Long id) throws Exception {
        var car = carRepository.getById(id);
        if(car != null)
            return car;
        else throw new Exception("Car not found");
    }

    public List<Car> getCars() throws Exception {
        var cars = carRepository.findAll();
        if(cars != null) {
            return cars;
        }
        else throw new Exception("Cars is null");
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Car car, Long destId) {
        var destCar = carRepository.getById(destId);
        destCar.setBrand(car.getBrand());
        destCar.setYear(car.getYear());
        destCar.setVIN(car.getVIN());
        destCar.setModel(car.getModel());
        destCar.setMileage(car.getMileage());
        return carRepository.save(destCar);
    }

    public void removeCarById(Long id) {
        carRepository.deleteById(id);
    }
}
