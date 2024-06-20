class Vehicle {
    move() {
        console.log("Moving...");
    }
}

class Car extends Vehicle {
    move() {
        console.log("Car is moving...");
    }
}

class Motorcycle extends Vehicle {
    move() {
        console.log("Motorcycle is moving...");
    }
}

class Bicycle extends Vehicle {
    move() {
        console.log("Bicycle is moving...");
    }
}

let v = new Car();
v.move(); // Output: Car is moving...

v = new Motorcycle();
v.move(); // Output: Motorcycle is moving...

v = new Bicycle();
v.move(); // Output: Bicycle is moving...