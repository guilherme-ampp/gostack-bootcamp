/* eslint-disable no-useless-constructor */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

/* eslint-disable class-methods-use-this */
interface ISessionDTO {
    email: string;
    password: string;
}

interface IAuthenticatedUserDTO {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        email,
        password,
    }: ISessionDTO): Promise<IAuthenticatedUserDTO> {
        const user = await this.usersRepository.findByEmail(email);

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
