// Router is the modules for routes in express
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

// routes has all the http methods we already know
const routes = Router();

// this will delegate all requests coming into /appointments
// to routes defined in the appointmentsRouter object
routes.use('/appointments', appointmentsRouter);

export default routes;
