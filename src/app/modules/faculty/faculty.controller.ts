import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFildes } from '../../../constants/user';
import { FacultyServices } from './faculty.service';
import httpStatus from 'http-status';
import { IFaculty } from './faculty.interface';

const getAllfaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFildes);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyServices.getAllfaculties(
    filters,
    paginationOptions
  );

  const response = {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: 'Faculty retrieved successfully.',
  };
  sendResponse<IFaculty[]>(res, response);
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyServices.getSingleFaculty(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Faculty retrieved successfully.',
  };
  sendResponse<IFaculty>(res, response);
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyServices.updateFaculty(id, updatedData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully Updated Faculty',
  };
  sendResponse<IFaculty>(res, response);
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyServices.deleteFaculty(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully deleted Faculty',
  };
  sendResponse<IFaculty>(res, response);
});

export const FacultyController = {
  getAllfaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
