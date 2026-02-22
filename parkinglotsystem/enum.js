const VehicleType = Object.freeze({
    BIKE: "BIKE",
    CAR: "CAR",
    TRUCK: "TRUCK",
});

const SpotType = Object.freeze({
    BIKE: "BIKE",
    COMPACT: "COMPACT",
    LARGE: "LARGE",
});

const SpotStatus = Object.freeze({
    AVAILABLE: "AVAILABLE",
    OCCUPIED: "OCCUPIED",
    RESERVED: "RESERVED",
});
const PaymentStatus = Object.freeze({
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
});

module.exports = { VehicleType, SpotType, SpotStatus, PaymentStatus};
