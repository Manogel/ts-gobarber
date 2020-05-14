import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import sessionsController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.store,
);

export default sessionsRouter;
