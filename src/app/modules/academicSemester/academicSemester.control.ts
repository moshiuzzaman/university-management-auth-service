import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicsemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFilds } from '../../../constants/pagination';
import { semesterFilterableFildes } from './academicSemester.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const academicSemester = req.body;

  const result = await AcademicSemesterService.createSemester(academicSemester);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully create academic Semester',
  };
  sendResponse<IAcademicsemester>(res, response);
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterFilterableFildes);

  const paginationOptions = pick(req.query, paginationFilds);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  const response = {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: 'Semester retrieved successfully.',
  };
  sendResponse<IAcademicsemester[]>(res, response);
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Semester retrieved successfully.',
  };
  sendResponse<IAcademicsemester>(res, response);
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully Updated academic Semester',
  };
  sendResponse<IAcademicsemester>(res, response);
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully deleted academic Semester',
  };
  sendResponse<IAcademicsemester>(res, response);
});

export const AcademicSemesterControl = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
