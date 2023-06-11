import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserService.createUser(user);

  const response = {
    statusCode: status.OK,
    data: result,
    success: true,
    message: 'Successfully create user',
  };
  sendResponse(res, response);
});

export const UserControl = {
  createUser,
};
