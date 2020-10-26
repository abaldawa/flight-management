/**
 * User: abhijit.baldawa
 *
 * This module exposes methods which interacts with flightDetails DB collection
 */

import * as flightDetailsModel from '../database/models/flightDetails.model';

/**
 * @public
 *
 * Get flight by ID
 *
 * @param flightId
 */
const getFlightById = (flightId: string) => {
  return flightDetailsModel.getFlightById(flightId);
};

/**
 * @public
 *
 * Delete flight by ID
 *
 * @param flightId
 */
const deleteFlightById = async (flightId: string) => {
  const deleteResult = await flightDetailsModel.deleteFlightById(flightId);
  return Boolean(deleteResult.deletedCount);
};

/**
 * @public
 *
 * Update flight by ID
 *
 * @param flightId
 * @param flight
 */
const updateFlightById = async (
  flightId: string,
  flight: flightDetailsModel.FlightDetails
) => {
  const updateResult = await flightDetailsModel.updateFlightById(
    flightId,
    flight
  );

  return Boolean(updateResult.nModified);
};

/**
 * @public
 *
 * Insert a new flight in DB
 *
 * @param flight
 */
const saveFlightDetails = (flight: flightDetailsModel.FlightDetails) => {
  return flightDetailsModel.saveFlightDetails(flight);
};

/**
 * @public
 *
 * Fetches all flights from DB
 */
const getAllFlights = () => flightDetailsModel.getAllFights();

/**
 * @public
 *
 * Inserts all flights details in DB
 *
 * @param flights
 */
const saveAllFlights = (flights: flightDetailsModel.FlightDetails[]) => {
  return flightDetailsModel.insertAllFlights(flights);
};

/**
 * @public
 *
 * Get total flights records count in DB
 */
const totalFlightDetailsCount = () => {
  return flightDetailsModel.totalFlightDetailsCount();
};

export {
  saveFlightDetails,
  saveAllFlights,
  getFlightById,
  getAllFlights,
  updateFlightById,
  deleteFlightById,
  totalFlightDetailsCount,
};
