// parking lot singleton

const { PaymentStatus, VehicleType } = require("./enum");
const ParkingFloor = require("./parkingfloor");
const { CompactSpot, Bike } = require("./parkingSpot");
const PaymentService = require("./PaymentService");
const { HourlyPricingRate } = require("./pricingStrategy");
const TicketService = require("./TicketService");
const Vehicle = require("./vehicle");

class ParkingLot {
    constructor() {
        if (ParkingLot.instance) {
            return ParkingLot.instance;
        }

        this.floors = [];
        this.ticketService = new TicketService();
        this.pricingStrategy = new HourlyPricingRate();
        this.paymentService = new PaymentService();
        ParkingLot.instance = this;
    }

    addFloor(floor) {
        this.floors.push(floor);
    }

    parkVehicle(vehicle) {
        console.log('floor',this.floors);
        
        for (let floor of this.floors) {
            const spot = floor.getAvailableSpot(vehicle);
            if (spot) {
                return this.ticketService.createTicket(vehicle, spot);
            }
        }
        throw new Error("Parking is full");
    }

    exitVehicle(ticketId) {
        const ticket = this.ticketService.closeTicket(ticketId);
        const amount = this.pricingStrategy.calculatePricing(ticket);
        this.amount = amount;

        const paymentStatus = this.paymentService.processPayment(
            ticket,
            amount,
        );
        if (paymentStatus === PaymentStatus.SUCCESS) {
            const floor = this.floors.find((f) => f.spots.has(ticket.spot.id));
            floor.freeSpot(ticket.spot);
            this.ticketService.activeTickets.delete(ticketId);
        }
        return { amount, paymentStatus };
    }
}

// Example 
const parkingLot = new ParkingLot();

const floor1 = new ParkingFloor("F1");
floor1.addSpot(new CompactSpot("C1"));
floor1.addSpot(new CompactSpot("C2"));

parkingLot.addFloor(floor1);

const vehicle = new Vehicle("KA-01-1234", VehicleType.BIKE);

const ticket = parkingLot.parkVehicle(vehicle);
console.log("Ticket Generated:", ticket.id);

setTimeout(() => {
  const receipt = parkingLot.exitVehicle(ticket.id);
  console.log("Payment Info:", receipt);
}, 3000);

module.exports = ParkingLot;
