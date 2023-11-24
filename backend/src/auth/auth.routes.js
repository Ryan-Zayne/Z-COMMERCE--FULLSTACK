import express from 'express';
import { validateDataWithZod } from '../common/lib/schemas/validateDataWithZod.middleware.js';
import { authenticateUser } from '../common/middleware/authenticateUser.middleware.js';
import { loginUser, logoutUser, refreshTokenHandler, signUpUser } from './authControllers/index.js';
import { preventTokenReuse } from './authControllers/refreshTokenHandler/preventTokenReuse.middleware.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateDataWithZod, signUpUser);
authRouter.post('/login', validateDataWithZod, loginUser);

authRouter.get('/refresh', preventTokenReuse, refreshTokenHandler);
authRouter.get('/logout', authenticateUser, logoutUser);

export { authRouter };
