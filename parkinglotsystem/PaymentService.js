const { PaymentStatus } = require("./enum");

class PaymentService {
    processPayment(ticket, amount) {
        // simulate external payment gateway
        console.log(`Processing payment of ${amount}`);
        return PaymentStatus.SUCCESS;
    }
}

module.exports = PaymentService;
