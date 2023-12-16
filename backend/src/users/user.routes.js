import express from 'express';
import { verifyUser } from '../common/middleware/index.js';
import { updateUserProfile } from './user.controllers.js';

const router = express.Router();

router.use(verifyUser);

router.patch('/update-profile', updateUserProfile);

export { router as userRouter };
