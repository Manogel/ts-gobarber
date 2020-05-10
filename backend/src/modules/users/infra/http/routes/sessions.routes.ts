import { Router } from 'express';
import sessionsController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.store);

export default sessionsRouter;
