/* eslint-disable class-methods-use-this */
import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';

interface UpdateAvatarDTO {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: UpdateAvatarDTO): Promise<User> {
        const userRepository = getRepository(User);

        // it is important for this service not to assume the user validation
        // happened before this method - so we do it again
        const user = await userRepository.findOne(user_id);

        if (!user) {
            // user does not exist
            throw new AppError(
                'Only authenticated users can change their avatar',
                401,
            );
        }

        if (user.avatar) {
            // delete previous avatar
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
