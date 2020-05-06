/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

/**
 * Even though, at the start of our project, the set of data
 * that we are passing around is the same (we see data: Date and provider: string)
 * repeat quite a lot - but do not fall into the trap of trying to make it into
 * system-wide common class!
 * Prematurely optimizing your code might lead to unexpected hindrances
 * in flexibility
 */
interface RequestDTO {
    date: Date;
    provider_id: string;
}

/**
 * Service classes will have a single public method
 * named 'execute' or 'run' or something similar.
 *
 * Service classes have no direct access to the request data
 *
 * * Receive information
 * * Handle errors and exceptions
 * * Access to the repository of appointments
 */
class CreateAppointmentService {
    public async execute({
        date,
        provider_id,
    }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentRepository,
        );
        // startOfHour will get a date and zero all minutes, seconds and milliseconds of a given date
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError(`The time slot is not available: ${date}`);
        }

        // create() will just create an instance of our entity
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // save() is the method that will persist it in the DB
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
