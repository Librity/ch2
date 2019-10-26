import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';

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

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/memberships', MembershipController.index);
routes.get('/students/:student_id/memberships', MembershipController.show);
routes.post('/students/:student_id/memberships', MembershipController.store);
routes.put(
  '/students/:student_id/memberships/:membership_id',
  MembershipController.update
);
routes.delete(
  '/students/:student_id/memberships/:membership_id',
  MembershipController.destroy
);

export default routes;
