import { SortOrder } from 'mongoose';
import { userSearchableFildes } from '../../../constants/user';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import IGenericResponse from '../../../interfaces/IGenericResponse';
import { IUserFilter } from '../../../interfaces/IUser';
import { IPaginationOptions } from '../../../interfaces/IpaginationOptions';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllAdmins = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFildes.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, '😡 Admin not found');
  }
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate(
    { _id: id },
    { $set: updatedAdminData },
    {
      new: true,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

export const AdminServices = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
