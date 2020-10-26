/**
 * User: abhijit.baldawa
 *
 * This module exposes methods to perform CRUD operations on flightDetails collection
 */

import mongoose, { Document, Schema } from 'mongoose';

const COLLECTION_NAME = 'flightDetails';

// --- Define types ---
type UpdateOneResult = {
  n: number; // Number of documents matched
  nModified: number; // Number of documents modified
  ok: number;
};

interface FlightDetails {
  flightCode: string;
  flightProvider: string;
  sourcePortName: string;
  sourcePortCode: string;
  destinationPortName: string;
  destinationPortCode: string;
  scheduledArrival: Date;
  delayedScheduledArrival?: Date;
  arrivalTerminal: string;
  scheduledDeparture: Date;
  status: 'LANDED' | 'ON_SCHEDULE' | 'DELAYED';
}

interface FlightDetailsDBRecord extends FlightDetails, Document {}
// --- Types END ---

// --- Define schema and initialize model
const flightDetailsSchema = new Schema<FlightDetailsDBRecord>({
  flightCode: { type: String, required: true },
  flightProvider: { type: String, required: true },
  sourcePortName: { type: String, required: true },
  sourcePortCode: { type: String, required: true },
  destinationPortName: { type: String, required: true },
  destinationPortCode: { type: String, required: true },
  scheduledArrival: { type: Date, required: true },
  scheduledDeparture: { type: Date, required: true },
  delayedScheduledArrival: { type: Date, required: false },
  arrivalTerminal: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['LANDED', 'ON_SCHEDULE', 'DELAYED'],
  },
});
const FlightDetailsModel = mongoose.model<FlightDetailsDBRecord>(
  COLLECTION_NAME,
  flightDetailsSchema
);
// ---- END ----

/**
 * @public
 *
 * Get all flightDetails records
 */
const getAllFights = async (): Promise<FlightDetailsDBRecord[]> => {
  try {
    return await FlightDetailsModel.find();
  } catch (err) {
    throw new Error(`Error querying all flights from DB. ${err}`);
  }
};

/**
 * @public
 *
 * Inserts all flights in the DB
 *
 * @param flights
 */
const insertAllFlights = async (
  flights: FlightDetails[]
): Promise<FlightDetailsDBRecord[]> => {
  try {
    return await FlightDetailsModel.insertMany(flights);
  } catch (err) {
    throw new Error(`Error inserting all flights in DB. ${err}`);
  }
};

/**
 * @public
 *
 * Save new flight details
 *
 * @param flightDetails
 */
const saveFlightDetails = async (
  flightDetails: FlightDetails
): Promise<FlightDetailsDBRecord> => {
  try {
    return await new FlightDetailsModel(flightDetails).save();
  } catch (err) {
    throw new Error(
      `Error saving flightDetails = '${JSON.stringify(
        flightDetails
      )}' in DB. ${err}`
    );
  }
};

/**
 * @public
 *
 * Get flight details by its id
 *
 * @param flightId
 */
const getFlightById = async (
  flightId: string
): Promise<FlightDetailsDBRecord | null> => {
  try {
    return await FlightDetailsModel.findById({ _id: flightId });
  } catch (err) {
    throw new Error(`Error querying flightId = '${flightId}' from DB. ${err}`);
  }
};

/**
 * @public
 *
 * Delete flight by id
 *
 * @param flightId
 */
const deleteFlightById = async (flightId: string) => {
  try {
    return await FlightDetailsModel.deleteOne({ _id: flightId });
  } catch (err) {
    throw new Error(`Error deleting flightId = '${flightId}' from DB. ${err}`);
  }
};

/**
 * @public
 *
 * Delete flight by id
 *
 * @param flightId
 * @param updatedFlight
 */
const updateFlightById = async <K extends keyof FlightDetails>(
  flightId: string,
  updatedFlight: Pick<FlightDetails, K>
): Promise<UpdateOneResult> => {
  try {
    return await FlightDetailsModel.updateOne(
      { _id: flightId },
      { $set: updatedFlight }
    );
  } catch (err) {
    throw new Error(
      `Error updating flightId = '${flightId}' with '${JSON.stringify(
        updatedFlight
      )}' in DB. ${err}`
    );
  }
};

/**
 * @public
 *
 * Get count of total flight records in collection
 */
const totalFlightDetailsCount = async (): Promise<number> => {
  try {
    return await FlightDetailsModel.estimatedDocumentCount();
  } catch (err) {
    throw new Error(`Error getting total flights count from DB. ${err}`);
  }
};

export {
  FlightDetails,
  insertAllFlights,
  getAllFights,
  saveFlightDetails,
  getFlightById,
  updateFlightById,
  deleteFlightById,
  totalFlightDetailsCount,
};
