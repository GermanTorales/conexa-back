import express from 'express';
import { UsersController } from '../../controllers';
import { validate } from '../../middlewares';
import { login } from '../../validations';

const router = express.Router();

router.use('/users', router);

router.post('/login', validate(login), UsersController.handleLogin);

export default router;
