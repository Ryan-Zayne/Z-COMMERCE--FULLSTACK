import express from 'express';
import authenticateUser from '../common/middleware/authenticateUser.middleware.js';
import { updateUserProfile } from './user.controllers.js';

const userRouter = express.Router();

// Applying token verification to all routes
userRouter.use(authenticateUser);

// Routes
userRouter.patch('/update-profile', updateUserProfile);

export { userRouter };
