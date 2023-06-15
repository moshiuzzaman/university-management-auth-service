import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import IGenericResponse from '../../../interfaces/IGenericResponse';
import {
  IManagementDepartment,
  IManagementDepartmentFilter,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/IpaginationOptions';
import { managementDepartmentSearchableFildes } from './managementDepartment.constant';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  if (!result) {
    throw new Error('Faild to create Management Department');
  }
  return result;
};

const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFildes.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

export const ManagementDepartmentServices = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
