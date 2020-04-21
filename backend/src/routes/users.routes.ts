import { Router, request } from 'express';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
const usersRouter = Router();

import authMiddleware from '../middlewares/auth';
import multerConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const upload = multer(multerConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatar_filename: req.file.filename,
    });

    res.json(user);
  },
);

export default usersRouter;
