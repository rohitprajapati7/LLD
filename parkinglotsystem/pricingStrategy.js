class PricingStrategy {
    calculatePricing(ticket) {
        throw new Error("calculate pricing not implemented");
    }
}

class HourlyPricingRate extends PricingStrategy {
    constructor(ratePerHour = 20) {
        super();
        this.ratePerHour = ratePerHour;
    }

    calculatePricing(ticket){
        const diffMs = ticket.exitTime - ticket.entryTime;
        const hours = Math.ceil(diffMs / (1000 * 60 * 60));
        return hours * this.ratePerHour;
    }
}

module.exports = {PricingStrategy, HourlyPricingRate}