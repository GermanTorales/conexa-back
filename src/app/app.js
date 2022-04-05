import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import { config, logger } from '../config';
import { successHandler as morganSuccessHandler, errorHandler as morganErrorHandler } from '../config/morgan.js';
import { RoutesV1 } from '../routes/index.js';
import ApiError from '../utils/ApiError.js';

export default class Api {
  async bootstrap(app) {
    logger.info('Express app starting...');

    if (config.env !== 'test') {
      app.use(morganSuccessHandler);
      app.use(morganErrorHandler);
    }

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // enable cors
    app.use(cors());
    app.options('*', cors());

    // v1 api routes
    app.use('/api/v1', RoutesV1);

    // 404 error handler
    app.use((req, res, next) => {
      const error = new Error('Not found');
      error.status = httpStatus.NOT_FOUND;
      error.statusCode = httpStatus.NOT_FOUND;

      next(new ApiError(error.status, error.message, false, error.stack));
    });

    // error handler middleware
    app.use((error, req, res, next) => {
      logger.error(`Error occured: ${error?.message}`);

      return res.status(error.status || error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({
        error: {
          status: error.status || error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal Server Error',
        },
      });
    });
  }
}
