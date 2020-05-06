import { Repository, getRepository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/Users';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    // async functions actually return Promises
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        // create() will just create an instance of our entity
        const appointment = this.ormRepository.create(userData);

        // save() is the method that will persist it in the DB
        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);
        return user;
    }
}

export default UsersRepository;
