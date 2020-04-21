import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
const usersRouter = Router();

import authMiddleware from '../middlewares/auth';
import multerConfig from '../config/upload';

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
    try {
      console.log(req.file);
      res.json({ ok: true });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

export default usersRouter;
