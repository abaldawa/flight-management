type FlightDetails = {
    _id: string;
    flightCode: string;
    flightProvider: string;
    sourcePortName: string;
    sourcePortCode: string;
    destinationPortName: string;
    destinationPortCode: string;
    scheduledArrival: string;
    delayedScheduledArrival?: string;
    arrivalTerminal: string;
    scheduledDeparture: Date;
    status: 'LANDED' | 'ON_SCHEDULE' | 'DELAYED';
};

export type {
    FlightDetails
};