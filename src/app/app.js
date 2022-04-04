import express from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import { jwtStrategy, config, logger } from '../config';
import { successHandler as morganSuccessHandler, errorHandler as morganErrorHandler } from '../config/morgan.js';
// import { RoutesV1 } from '../routes/index.js';

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

    // jwt authentication
    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    // v1 api routes
    // app.use('/api/v1', RoutesV1);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
      next(new Error({ status: httpStatus.NOT_FOUND, error: 'Not found' }));
    });
  }
}
