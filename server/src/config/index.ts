/**
 * User: abhijit.baldawa
 *
 * This module exposes methods to fetch environment variables
 */

import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { FlightDetails } from '../database/models/flightDetails.model';

type MongoDbConfig = {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  authSource: string | undefined;
};

/**
 * @public
 *
 * Get port from environment variable or else default to 3000
 * This method returns the port number on which the server should run
 */
const getPort = (): number => (process.env.PORT ? +process.env.PORT : 3000);

/**
 * @public
 *
 * Getter method for mongo DB config
 *
 * @returns {MongoDbConfig}
 */
const getMongoDbConfig = (): MongoDbConfig => {
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const authSource = process.env.DB_AUTHSOURCE;

  if (!dbHost) {
    throw new Error(`'DB_HOST' needs to be set in .env file`);
  }

  if (!dbPort) {
    throw new Error(`'DB_PORT' needs to be set in .env file`);
  }

  if (!dbName) {
    throw new Error(`'DB_NAME' needs to be set in .env file`);
  }

  return {
    dbHost,
    dbName,
    authSource,
    dbUser,
    dbPassword,
    dbPort: +dbPort,
  };
};

const getDummyFlights = (): FlightDetails[] => {
  const dummyDataPath = process.env.DUMMY_FLIGHT_RECORDS_PATH;

  if (!dummyDataPath) {
    throw new Error(`'DUMMY_FLIGHT_RECORDS_PATH' is required in .env file`);
  }

  const dummyDataFullPath = path.join(__dirname, '..', '..', dummyDataPath);
  const dummyFlightDetails = fs.readFileSync(dummyDataFullPath, {
    encoding: 'utf-8',
  });

  return JSON.parse(dummyFlightDetails);
};

export { MongoDbConfig, getPort, getMongoDbConfig, getDummyFlights };
