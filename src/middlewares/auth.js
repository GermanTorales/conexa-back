import httpStatus from 'http-status';
import Jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import { config } from '../config';
import { users } from '../mock/users.mock.js';

const verifyCallback = (req, next, requiredRights) => async (err, user, info) => {
  if (err || info || !user) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));

  next();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      verifyCallback(req, next, requiredRights);

      const tokenTaken = req.headers.authorization;
      const token = tokenTaken?.split('Bearer ').join('');

      if (!token) return res.status(httpStatus.FORBIDDEN).json({ code: httpStatus.FORBIDDEN, message: 'Please authenticate' });

      const decoded = Jwt.verify(token, config.jwt.secret);
      req.user = decoded;

      const user = await users.find(user => user.email === decoded.email);

      if (requiredRights.length) throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

      next();
    } catch (e) {
      if (e?.statusCode) next(e);

      next(new ApiError(httpStatus.UNAUTHORIZED, e?.message));
    }
  };

export default auth;
