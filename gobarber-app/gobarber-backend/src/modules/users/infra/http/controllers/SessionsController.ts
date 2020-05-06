/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );

        // deconstruct the returned object from the service to make the
        // code clearer and more readable - do not hide variables
        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
