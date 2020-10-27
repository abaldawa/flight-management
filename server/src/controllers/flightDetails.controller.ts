/**
 * User: abhijit.baldawa
 *
 * This module exposes controller method's which are connected to /flights REST endpoint
 */

import { RequestHandler } from 'express';
import * as flightDetailsService from '../services/flightDetails.service';
import { getDummyFlights } from '../config';
import type { FlightDetails } from '../database/models/flightDetails.model';

/**
 * @public
 *
 * @RestEndPoint GET /flights
 *
 * @param _ - express request object
 * @param res - express response object
 */
const getAllFlights: RequestHandler = async (_, res) => {
  try {
    const flights = await flightDetailsService.getAllFlights();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @public
 *
 * @RestEndPoint GET /flights/:id
 *
 * @param req - express request object
 * @param res - express response object
 */
const getFlightById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await flightDetailsService.getFlightById(id);

    if (flight) {
      res.status(200).json(flight);
    } else {
      res.status(404).json({ error: `Flight id='${id}' not found` });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @public
 *
 * @RestEndPoint DELETE /flights/:id
 *
 * @param req - express request object
 * @param res - express response object
 */
const deleteFlightById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await flightDetailsService.deleteFlightById(id);

    if (!isDeleted) {
      res.status(404).json({ error: `Flight id='${id}' not found` });
    } else {
      res
        .status(200)
        .json({ message: `Flight id='${id}' deleted successfully` });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @public
 *
 * @RestEndPoint PUT /flights/:id
 *
 * @param req - express request object
 * @param res - express response object
 */
const updateFlightById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const flightUpdate = req.body as FlightDetails;
    const isUpdated = await flightDetailsService.updateFlightById(
      id,
      flightUpdate
    );

    if (!isUpdated) {
      res.status(404).json({ error: `Flight id='${id}' not found` });
    } else {
      const updatedFlight = await flightDetailsService.getFlightById(id);
      res.status(200).json(updatedFlight);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @public
 *
 * @RestEndPoint POST /flights
 *
 * @param req - express request object
 * @param res - express response object
 */
const saveNewFlightDetails: RequestHandler = async (req, res) => {
  try {
    const newFlight = req.body as FlightDetails;
    const createdFlight = await flightDetailsService.saveFlightDetails(
      newFlight
    );

    res.status(200).json(createdFlight);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @public
 *
 * @RestEndPoint POST /flights/createDummy
 *
 * Create dummy flights on in DB
 *
 * @param _ - express request object
 * @param res - express response object
 */
const insertDummyFlights: RequestHandler = async (_, res) => {
  try {
    const totalFlightsCount = await flightDetailsService.totalFlightDetailsCount();

    if (totalFlightsCount) {
      res.status(409).json({ error: 'flight details already exists in DB' });
      return;
    }

    const dummyFlights = await flightDetailsService.saveAllFlights(
      getDummyFlights()
    );

    res.status(200).json(dummyFlights);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export {
  getAllFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
  saveNewFlightDetails,
  insertDummyFlights,
};
