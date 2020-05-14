import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddleware from '../middlewares/auth';
import profileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(authMiddleware);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
