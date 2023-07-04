import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...others } = result;
  // set refresh token in cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  const response = {
    statusCode: httpStatus.OK,
    data: others,
    success: true,
    message: 'Successfully login',
  };
  sendResponse(res, response);
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);
  // set refresh token in cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully login',
  };
  sendResponse(res, response);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  const user = req.user;
  const result = await AuthServices.changePassword(user, passwordData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully changed password',
  };
  sendResponse(res, response);
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
