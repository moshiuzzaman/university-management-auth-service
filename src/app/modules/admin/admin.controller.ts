import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFildes } from '../../../constants/user';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFildes);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminServices.getAllAdmins(filters, paginationOptions);

  const response = {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: '✅ Admin retrieved successfully.',
  };
  sendResponse<IAdmin[]>(res, response);
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminServices.getSingleAdmin(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: '✅ Admin retrieved successfully.',
  };
  sendResponse<IAdmin>(res, response);
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminServices.updateAdmin(id, updatedData);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Successfully Updated Admin',
  };
  sendResponse<IAdmin>(res, response);
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminServices.deleteAdmin(id);

  const response = {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: '✅ Successfully deleted Admin',
  };
  sendResponse<IAdmin>(res, response);
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
