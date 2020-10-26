/**
 * User: abhijit.baldawa
 *
 * This module contains all the routes for "/flights" endpoint
 */

import { Router } from 'express';
import {
  saveNewFlightDetails,
  deleteFlightById,
  updateFlightById,
  getFlightById,
  getAllFlights,
  insertDummyFlights,
} from '../controllers/flightDetails.controller';

const router = Router();

router.get('/', getAllFlights);
router.post('/', saveNewFlightDetails);
router.post('/createDummy', insertDummyFlights);
router.delete('/:id', deleteFlightById);
router.put('/:id', updateFlightById);
router.get('/:id', getFlightById);

export default router;
