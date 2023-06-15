import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { studentFilterableFildes } from './student.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import { IStudent } from './student.interface';
import sendResponse from '../../../shared/sendResponse';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFildes);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentServices.getAllStudents(
    filters,
    paginationOptions
  );

  const response = {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: 'Student retrieved successfully.',
  };
  sendResponse<IStudent[]>(res, response);
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentServices.getSingleStudent(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Student retrieved successfully.',
  };
  sendResponse<IStudent>(res, response);
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentServices.updateStudent(id, updatedData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully Updated Student',
  };
  sendResponse<IStudent>(res, response);
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentServices.deleteStudent(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully deleted Student',
  };
  sendResponse<IStudent>(res, response);
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
