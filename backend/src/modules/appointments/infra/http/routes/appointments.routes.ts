import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/auth';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', AppointmentController.store);

export default appointmentsRouter;
