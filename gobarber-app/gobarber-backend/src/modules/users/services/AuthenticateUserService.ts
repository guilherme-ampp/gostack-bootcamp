import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

/* eslint-disable class-methods-use-this */
interface SessionDTO {
    email: string;
    password: string;
}

interface AuthenticatedUserDTO {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: SessionDTO): Promise<AuthenticatedUserDTO> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError(`Incorrect email/password combination.`);
        }

        // user.password - encrypted password
        // password - non-encrypted password
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new AppError(`Incorrect email/password combination.`);
        }

        // user is authenticated!
        // the sign method takes:
        // 1 - user information for the payload do NOT include sensitive information
        // 2 - a secret passphrase only known to our application
        // 3 - configuration of our token:
        //       subject=user id that generated the token, the owner of the token
        //       expiresIn=the duration of the token
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn, // one day - 24 hours
        });
        return { user, token };
    }
}

export default AuthenticateUserService;
