import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ManagementDepartmentServices } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';
import { managementDepartmentFilterableFildes } from './managementDepartment.constant';
import ApiError from '../../../errors/ApiError';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const managementDepartment = req.body;

    const result =
      await ManagementDepartmentServices.createManagementDepartment(
        managementDepartment
      );

    const response = {
      statusCode: httpStatus.OK,
      data: result,
      success: true,
      message: 'Successfully create ManagementDepartment.',
    };
    sendResponse<IManagementDepartment>(res, response);
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFildes);

    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await ManagementDepartmentServices.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    const response = {
      statusCode: httpStatus.OK,
      data: result.data,
      meta: result.meta,
      success: true,
      message: 'ManagementDepertments retrieved successfully.',
    };
    sendResponse<IManagementDepartment[]>(res, response);
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentServices.getSingleManagementDepartment(id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id');
    }

    const response = {
      statusCode: httpStatus.OK,
      data: result,
      success: true,
      message: 'ManagementDepartment retrieved successfully.',
    };
    sendResponse<IManagementDepartment>(res, response);
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result =
      await ManagementDepartmentServices.updateManagementDepartment(
        id,
        updatedData
      );

    const response = {
      statusCode: httpStatus.OK,
      data: result,
      success: true,
      message: 'Successfully Updated  ManagementDepartment',
    };
    sendResponse<IManagementDepartment>(res, response);
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentServices.deleteManagementDepartment(id);

    const response = {
      statusCode: httpStatus.OK,
      data: result,
      success: true,
      message: 'Successfully deleted  ManagementDepartment',
    };
    sendResponse<IManagementDepartment>(res, response);
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
