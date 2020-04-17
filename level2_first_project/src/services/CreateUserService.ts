/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { hashSync, hash } from 'bcryptjs';
import User from '../models/Users';

interface UserDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: UserDTO): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error(`E-mail address already in use: ${email}`);
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
