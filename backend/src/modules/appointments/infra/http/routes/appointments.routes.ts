import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/auth';
import appointmentController from '../controllers/AppointmentController';
import providerAppointmentController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.store);
appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;
