import express from 'express';
import { LoginSchema, SignUpSchema } from '../common/lib/schemas/formSchema.js';
import { handleTokenRefresh, loginUser, logoutUser, signUpUser } from './auth.controllers.js';
import { validateDataWithZod } from './auth.services.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateDataWithZod(SignUpSchema), signUpUser);
authRouter.post('/login', validateDataWithZod(LoginSchema), loginUser);
authRouter.get('/refresh', handleTokenRefresh);
authRouter.get('/logout', logoutUser);

export default authRouter;
