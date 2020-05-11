import { Router } from 'express';

import authMiddleware from '../middlewares/auth';
import profileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(authMiddleware);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
