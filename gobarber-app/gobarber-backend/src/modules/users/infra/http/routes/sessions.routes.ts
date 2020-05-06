import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();

    const authenticateUserService = new AuthenticateUserService(
        usersRepository,
    );

    // deconstruct the returned object from the service to make the
    // code clearer and more readable - do not hide variables
    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
