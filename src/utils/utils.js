import JWT from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import logger from '../config/winston-config';

export const ValidateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) res.status(400).json({ status: false, message: 'Token required' });

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error(`JWT: ${err.message}`);

      return res.status(401).json({ status: false, error: 'Token is not valid' });
    }

    req.decoded = decoded;

    next();
  });
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  logger.warn(`Validation Error on: '${req.url}'`);

  return res.status(422).json({
    status: false,
    message: 'Validation errors',
    info: extractedErrors,
  });
};
