import { Router } from 'express';

import forgotPasswordController from '../controllers/ForgotPasswordController';
import resetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.store);
passwordRouter.post('/reset', resetPasswordController.store);

export default passwordRouter;
