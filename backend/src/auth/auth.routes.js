import express from 'express';
import { LoginSchema, SignUpSchema, validateDataWithZod } from '../common/lib/schemas/formSchema.js';
import { preventTokenReuse } from '../common/middleware/index.js';
import { loginUser, logoutUser, signUpUser, tokenRefreshHandler } from './authControllers/index.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateDataWithZod(SignUpSchema), signUpUser);
authRouter.post('/login', validateDataWithZod(LoginSchema), loginUser);
authRouter.get('/refresh', preventTokenReuse, tokenRefreshHandler);
authRouter.get('/logout', logoutUser);

export default authRouter;
