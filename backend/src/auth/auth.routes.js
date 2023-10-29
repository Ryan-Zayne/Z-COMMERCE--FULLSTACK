import express from 'express';
import { LoginSchema, SignUpSchema } from '../common/lib/schemas/formSchema/index.js';
import { validateDataWithZod } from '../common/lib/schemas/formSchema/middleware/validateDataWithZod.js';
import { loginUser, logoutUser, refreshTokenHandler, signUpUser } from './authControllers/index.js';
import { preventTokenReuse } from './authControllers/refreshTokenHandler/middleware/preventTokenReuse.middleware.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateDataWithZod(SignUpSchema), signUpUser);
authRouter.post('/login', validateDataWithZod(LoginSchema), loginUser);
authRouter.get('/refresh', preventTokenReuse, refreshTokenHandler);
authRouter.get('/logout', logoutUser);

export default authRouter;
