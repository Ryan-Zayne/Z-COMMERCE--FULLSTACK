/* eslint-disable import/no-relative-packages */
import express from 'express';
import { LoginSchema, SignUpSchema } from '../../../frontend/src/lib/schemas/registerSchema.js';
import { loginUser, signUpUser } from './auth.controllers.js';
import { validateDataWithZod } from './auth.helpers.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateDataWithZod(SignUpSchema), signUpUser);
authRouter.post('/login', validateDataWithZod(LoginSchema), loginUser);

export default authRouter;
