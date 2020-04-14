import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, datetime } = request.body;

    // parseISO will convert a string into Date type in JavaScript
    // startOfHour will get a date and zero all minutes, seconds and milliseconds of a given date
    const parsedDate = startOfHour(parseISO(datetime));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: `The time slot is not available: ${parsedDate}` });
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });
    return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

export default appointmentsRouter;
