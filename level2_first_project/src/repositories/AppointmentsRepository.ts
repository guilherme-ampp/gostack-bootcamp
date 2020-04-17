import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
    // async functions actually return Promises
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentRepository;
