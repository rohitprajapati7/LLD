class Ticket {
    constructor(id, vehicle, spot) {
        this.id = id;
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = new Date();
        this.exitTime = null;
        this.amount = 0;
    }

    closeTicket() {
        this.exitTime = new Date();
    }
}

module.exports = Ticket;
