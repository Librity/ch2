import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';
import isAdminMiddleware from './app/middlewares/isAdmin';

const routes = new Router();

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.updateSelf);
routes.get('/users/:id', UserController.show);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.use(isAdminMiddleware);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/students', StudentController.create);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

routes.get('/users', PlanController.index);
routes.post('/users', PlanController.create);
routes.put('/users/:id', PlanController.update);
routes.delete('/users/:id', PlanController.destroy);

export default routes;
