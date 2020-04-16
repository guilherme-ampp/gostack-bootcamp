import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

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
    provider: string;
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
    private appointmentsRepository: AppointmentRepository;

    constructor(appointmentsRepository: AppointmentRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: RequestDTO): Appointment {
        // startOfHour will get a date and zero all minutes, seconds and milliseconds of a given date
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error(`The time slot is not available: ${date}`);
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
