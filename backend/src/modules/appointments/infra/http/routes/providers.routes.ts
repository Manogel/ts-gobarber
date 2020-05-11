import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/auth';
import providersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(authMiddleware);

providersRouter.get('/', providersController.index);

export default providersRouter;
