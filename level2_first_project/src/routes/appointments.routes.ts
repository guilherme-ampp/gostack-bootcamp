import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '../services/CreateAppointmentServices';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, datetime } = request.body;

        // parseISO will convert a string into Date type in JavaScript
        // transforms the data into a Date - simple data transformation
        const parsedDate = parseISO(datetime);

        const service = new CreateAppointmentsService(appointmentsRepository);

        const appointment = service.execute({ provider, date: parsedDate });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
