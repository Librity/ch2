import { Router } from 'express';

import SessionsController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';
import isAdminMiddleware from './app/middlewares/isAdmin';

const routes = new Router();

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.updateSelf);
routes.get('/users/:id', UserController.show);

routes.get('/students', StudentController.index);
routes.get('/students/:student_id', StudentController.show);

routes.get('/checkins', CheckinController.index);
routes.get('/students/:student_id/checkins', CheckinController.show);
routes.post('/students/:student_id/checkins', CheckinController.store);

routes.get('/help_orders', HelpOrderController.index);
routes.get('/students/:student_id/help_orders', HelpOrderController.show);
routes.post('/students/:student_id/help_orders', HelpOrderController.store);

routes.get(
  '/students/:student_id/help_orders/:help_order_id',
  AnswerController.show
);
routes.post(
  '/students/:student_id/help_orders/:help_order_id/answer',
  AnswerController.store
);

routes.use(isAdminMiddleware);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/students', StudentController.create);
routes.put('/students/:student_id', StudentController.update);
routes.delete('/students/:student_id', StudentController.destroy);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:plan_id', PlanController.update);
routes.delete('/plans/:plan_id', PlanController.destroy);

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
routes.put('/memberships/:membership_id', MembershipController.transfer);

export default routes;
