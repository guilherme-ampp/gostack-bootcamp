import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentServices';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// all of our routes should run by our ensureAuthenticated middleware
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, datetime } = request.body;

    // parseISO will convert a string into Date type in JavaScript
    // transforms the data into a Date - simple data transformation
    const parsedDate = parseISO(datetime);
    const appointmentsRepository = new AppointmentRepository();

    const service = new CreateAppointmentsService(appointmentsRepository);

    const appointment = await service.execute({
        provider_id,
        date: parsedDate,
    });
    return response.json(appointment);
});

export default appointmentsRouter;
