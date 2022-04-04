import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { UsersService } from '../services';

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await UsersService.login(email, password);

    if (!token) throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password is incorrect');

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default { handleLogin };
