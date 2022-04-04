import express from 'express';
import UsersRoutes from './user.routes';

const router = express.Router();

const defaultRoutes = [{ path: '/users', route: UsersRoutes }];

defaultRoutes.forEach(route => router.use(route.path, route.route));

export default router;
