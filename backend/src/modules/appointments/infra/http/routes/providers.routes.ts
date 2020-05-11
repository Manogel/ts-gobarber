import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/auth';
import providersController from '../controllers/ProvidersController';
import providerMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import providerDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

providersRouter.use(authMiddleware);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
