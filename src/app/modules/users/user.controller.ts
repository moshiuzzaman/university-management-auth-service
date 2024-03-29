import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await UserService.createStudent(student, userData);

  const response = {
    statusCode: status.OK,
    data: result,
    success: true,
    message: '✅ Successfully created student',
  };
  sendResponse(res, response);
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;

  const result = await UserService.createFaculty(faculty, userData);

  const response = {
    statusCode: status.OK,
    data: result,
    success: true,
    message: 'Successfully created faculty',
  };
  sendResponse(res, response);
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;

  const result = await UserService.createAdmin(admin, userData);

  const response = {
    statusCode: status.OK,
    data: result,
    success: true,
    message: '✅ Successfully created admin',
  };
  sendResponse(res, response);
});
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
