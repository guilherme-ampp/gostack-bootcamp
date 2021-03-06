/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUserDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IUserDTO): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError(`E-mail address already in use: ${email}`);
        }

        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
