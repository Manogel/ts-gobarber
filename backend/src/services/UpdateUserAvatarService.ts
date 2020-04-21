import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import AppError from '../erros/AppError';

interface Request {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  public async execute(data: Request): Promise<User> {
    const { avatar_filename, user_id } = data;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExistis) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar_filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
