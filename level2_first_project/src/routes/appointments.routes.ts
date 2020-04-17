import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentsService from '../services/CreateAppointmentServices';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, datetime } = request.body;

        // parseISO will convert a string into Date type in JavaScript
        // transforms the data into a Date - simple data transformation
        const parsedDate = parseISO(datetime);

        const service = new CreateAppointmentsService();

        const appointment = await service.execute({
            provider_id,
            date: parsedDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
