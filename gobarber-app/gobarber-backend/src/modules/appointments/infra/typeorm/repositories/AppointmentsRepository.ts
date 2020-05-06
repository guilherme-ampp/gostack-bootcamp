import { Repository, getRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointementsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentRepository implements IAppointmentsRepositories {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    // async functions actually return Promises
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        // create() will just create an instance of our entity
        const appointment = this.ormRepository.create({
            provider_id,
            date,
        });

        // save() is the method that will persist it in the DB
        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentRepository;
