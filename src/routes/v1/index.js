import express from 'express';
import UsersRoutes from './user.routes';
import JsonplaceholderRoutes from './jsonplaceholder.routes';

const router = express.Router();

const defaultRoutes = [
  { path: '/users', route: UsersRoutes },
  { path: '/jsonplaceholder', route: JsonplaceholderRoutes },
];

defaultRoutes.forEach(route => router.use(route.path, route.route));

export default router;
