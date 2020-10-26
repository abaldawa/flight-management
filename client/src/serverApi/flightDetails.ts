const GET_ALL_FLIGHTS_URL = '/flights';
const FLIGHT_ID_PATH_URL = '/flights/:flightId';
const CREATE_DUMMY_FLIGHTS_URL = '/flights/createDummy';

const getAllFlights = async <T>(): Promise<T> => {
    const res = await fetch(GET_ALL_FLIGHTS_URL);
    return res.json();
};

const deleteFlight = async (flightId: string): Promise<void> => {
    const url = FLIGHT_ID_PATH_URL.replace(':flightId', flightId);
    const res = await fetch(url, { method: 'DELETE'});
    return res.json();
};

const updateFlight = async <T>(
    flightId: string,
    data: Record<string, any>
): Promise<T> => {
    const url = FLIGHT_ID_PATH_URL.replace(':flightId', flightId);
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

const createDummyFlights = async <T>(): Promise<T> => {
    const res = await fetch(CREATE_DUMMY_FLIGHTS_URL, { method: 'POST'});
    return res.json();
};

export {
    getAllFlights,
    deleteFlight,
    updateFlight,
    createDummyFlights
};