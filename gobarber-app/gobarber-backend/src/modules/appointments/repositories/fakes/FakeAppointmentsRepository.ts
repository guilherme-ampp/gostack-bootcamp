import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointementsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepositories {
    private appointments: Appointment[] = [];

    // async functions actually return Promises
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.date === date,
        );
        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentRepository;
