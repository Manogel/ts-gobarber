import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddleware from '@modules/users/infra/http/middlewares/auth';
import appointmentController from '../controllers/AppointmentController';
import providerAppointmentController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.store,
);
appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;
