import Jwt from 'jsonwebtoken';
import { config } from '../config';
import { users } from '../mock/users.mock';

const login = async (email, password) => {
  const user = users.find(user => user.email === email);

  if (!user || user?.password !== password) return null;

  const token = Jwt.sign({ id: user._id, email: user.email }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes,
  });

  return token;
};

export default { login };
