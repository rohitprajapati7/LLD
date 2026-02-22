class ParkingFloor {
    constructor(floorId) {
        this.floorId = floorId;
        this.spots = new Map();
        this.availableSpots = new Map(); // SpotType -> Set
    }

    addSpot(spot) {
        this.spots.set(spot.id, spot);

        if (!this.availableSpots.has(spot.spotType)) {
            this.availableSpots.set(spot.spotType, new Set());
        }
        this.availableSpots.get(spot.spotType).add(spot);
    }

    getAvailableSpot(vehicle) {
        for (let [spotType, spots] of this.availableSpots.entries()) {
            for (let spot of spots) {
                if (spot.canFitVehicle(vehicle)) {
                    spots.delete(spot);
                    return spot;
                }
            }
        }
        return null;
    }

    freeSpot(spot) {
        spot.removeVehicle();
        this.availableSpots.get(spot.spotType).add(spot);
    }
}

module.exports = ParkingFloor;
