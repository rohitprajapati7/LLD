const { SpotStatus, SpotType, VehicleType } = require("./enum");

class ParkingSpot {
    constructor(id, spotType) {
        this.id = id;
        this.spotType = spotType;
        this.status = SpotStatus.AVAILABLE;
        this.currentVehicle = null;
    }

    canFitVehicle(vehicle) {
        throw new Error("Method not implemented");
    }

    assignVehicle(vehicle) {
        if (this.status !== SpotStatus.AVAILABLE) return false;
        this.currentVehicle = vehicle;
        this.status = SpotStatus.OCCUPIED;
        return true;
    }

    removeVehicle() {
        this.currentVehicle = null;
        this.status = SpotStatus.AVAILABLE;
    }
}

class CompactSpot extends ParkingSpot {
    constructor(id) {
        super(id, SpotType.COMPACT);
    }

    canFitVehicle(vehicle) {
        return vehicle.type === VehicleType.CAR || vehicle.type === VehicleType.BIKE;
    }
}

class Bike extends ParkingSpot {
    constructor(id) {
        super(id, SpotType.COMPACT);
    }
    canFitVehicle(vehicle) {
        return vehicle.type === VehicleType.CAR || vehicle.type === VehicleType.BIKE;
    }
}

module.exports = { ParkingSpot, CompactSpot, Bike };
    