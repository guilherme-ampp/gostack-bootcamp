// Router is the modules for routes in express
import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';

// routes has all the http methods we already know
const routes = Router();

// this will delegate all requests coming into /appointments
// to routes defined in the appointmentsRouter object
routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
