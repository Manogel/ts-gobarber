import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth';
import multerConfig from '@config/upload';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', UserController.store);

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
