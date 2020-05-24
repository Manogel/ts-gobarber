import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth';
import multerConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(multerConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      provider: Joi.boolean(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  UserController.store,
);

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
