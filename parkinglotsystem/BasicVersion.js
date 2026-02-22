class Spot {
    constructor(id, type) {
        this.id = id;
        this.occupied = false;
        this.type = type; // compact, large, bike
    }
}

class ParkingFloor {
    constructor(id) {
        this.floorid = id;
        this.spots = [];
    }

    addSpot(spots) {
        this.spots.push(spots);
    }
}

class BasicVersion {
    constructor() {
        this.tickets = new Map();
        this.floor = [];
    }

    // adding floor
    addFloor(floor) {
        this.floor.push(floor);
    }

    parkVehicle(vehicle) {
        for (const f of this.floor) {
            for (let spot of f.spots) {
                if (spot.type == vehicle.type && !spot.occupied) {
                    spot.occupied = true;
                    const ticket = {
                        id: Date.now(),
                        vehicle,
                        spot,
                        entryTime: new Date(),
                    };
                    this.tickets.set(ticket.id, ticket);
                    return ticket;
                }
            }
        }

        throw new Error("No available spot");
    }

    exit(ticketId) {
        const ticket = this.tickets.get(ticketId);

        if (!ticket) throw new Error("Invalid ticket");

        ticket.spot.occupied = false;
        this.tickets.delete(ticketId);

        return "Exited";
    }
}

const park = new BasicVersion();

const floor1 = new ParkingFloor(1);
floor1.addSpot(new Spot(1, "BIKE"));
floor1.addSpot(new Spot(1, "COMPACT"));

console.log(floor1);

park.addFloor(floor1);

const ticket = park.parkVehicle({ number: "KA01", type: "BIKE" });
console.log("Ticket:", ticket);

park.exit(ticket.id);
