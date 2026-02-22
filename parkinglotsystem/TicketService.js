const Ticket = require("./Ticket");
class TicketService {
    constructor() {
        this.activeTickets = new Map();
    }

    createTicket(vehicle, spot) {
        const id = `TICKET-${Date.now()}-${Math.random()}`;
        spot.assignVehicle(vehicle);

        const ticket = new Ticket(id, vehicle, spot);
        this.activeTickets.set(id, ticket);
        return ticket;
    }

    closeTicket(ticketId) {
        const ticket = this.activeTickets.get(ticketId);
        if (!ticket) throw new Error("invalid ticket");
        ticket.closeTicket();
        return ticket;
    }
}

module.exports = TicketService;
