import express from 'express';
import { UserControl } from './user.control';
import { UserValidation } from './user.validation';
import ValidateRequest from '../../middlewares/velidateRequest';
const router = express.Router();

router.post(
  '/create-user',
  ValidateRequest(UserValidation.createUserZodSchema),
  UserControl.createUser
);

export const UserRoutes = router;
