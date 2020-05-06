import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
});

// this is the only route we need to be authenticated
// use PATCH when updating only a single information of the resource
// we'll add a new middleware to handle the file upload
// upload.single('<name of the property containing the image being uploaded>')
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const usersRepository = new UsersRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            usersRepository,
        );

        await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json({ ok: true });
    },
);

export default usersRouter;
