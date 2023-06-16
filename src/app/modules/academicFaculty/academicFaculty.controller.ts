import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.services';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { facultyFilterableFildes } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const academicFaculty = req.body;

  const result = await AcademicFacultyServices.createFaculty(academicFaculty);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully create academic Faculty.',
  };
  sendResponse<IAcademicFaculty>(res, response);
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFildes);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyServices.getAllFaculties(
    filters,
    paginationOptions
  );

  const response = {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: 'faculties retrieved successfully.',
  };
  sendResponse<IAcademicFaculty[]>(res, response);
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.getSingleFaculty(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Faculty retrieved successfully.',
  };
  sendResponse<IAcademicFaculty>(res, response);
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicFacultyServices.updateFaculty(id, updatedData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully Updated academic Faculty',
  };
  sendResponse<IAcademicFaculty>(res, response);
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.deleteFaculty(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully deleted academic Faculty',
  };
  sendResponse<IAcademicFaculty>(res, response);
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
