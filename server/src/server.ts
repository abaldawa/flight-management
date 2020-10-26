/**
 * User: abhijit.baldawa
 *
 * This module initializes all the pre-requisites and then starts the express server
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { getPort, getMongoDbConfig } from './config';
import { createDBConnection } from './database/dbConnection';
import flightDetailsRouter from './routes/flightDetails.routes';
import logger from './logger';

/**
 * Immediately invoking async method which does all the standard server startup routine.
 */
(async () => {
  try {
    const app = express();
    const PORT = getPort();
    const mongoDbConfig = getMongoDbConfig();

    // Add middlewares
    app.use(bodyParser.json());

    // Add routes
    app.use('/flights', flightDetailsRouter);

    // Serve client
    app.use(
      express.static(path.join(__dirname, '..', '..', 'client', 'build'))
    );

    // Connect to mongoDB
    await createDBConnection(mongoDbConfig);
    logger.info('Connected to MongoDB.');

    // Start HTTP server
    await new Promise((resolve, reject) => {
      app.listen(PORT, resolve).on('error', reject);
    });
    logger.info(`Server is listening on port = ${PORT}`);
  } catch (err) {
    logger.error(
      `Error while starting server. Error: ${(err as Error).stack}. Exiting...`
    );
    process.exit(1);
  }
})();
