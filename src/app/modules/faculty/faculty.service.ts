import { SortOrder } from 'mongoose';
import { userSearchableFildes } from '../../../constants/user';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import IGenericResponse from '../../../interfaces/IGenericResponse';
import { IUserFilter } from '../../../interfaces/IUser';
import { IPaginationOptions } from '../../../interfaces/IpaginationOptions';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllfaculties = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
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

  const result = await Faculty.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  const { name, ...facultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate(
    { _id: id },
    { $set: updatedFacultyData },
    {
      new: true,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

export const FacultyServices = {
  getAllfaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
