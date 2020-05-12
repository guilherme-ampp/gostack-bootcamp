/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import 'reflect-metadata';
import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointementsRepository';

/**
 * Even though, at the start of our project, the set of data
 * that we are passing around is the same (we see data: Date and provider: string)
 * repeat quite a lot - but do not fall into the trap of trying to make it into
 * system-wide common class!
 * Prematurely optimizing your code might lead to unexpected hindrances
 * in flexibility
 */
interface IRequestDTO {
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
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
    }: IRequestDTO): Promise<Appointment> {
        // startOfHour will get a date and zero all minutes, seconds and milliseconds of a given date
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError(`The time slot is not available: ${date}`);
        }

        // create() will just create an instance of our entity
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
