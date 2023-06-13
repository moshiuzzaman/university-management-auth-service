import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import IGenericResponse from '../../../interfaces/IGenericResponse';
import { IPaginationOptions } from '../../../interfaces/IpaginationOptions';
import {
  academicSemesterTitleCodeMapper,
  semesterSearchableFildes,
} from './academicSemester.constant';
import {
  IAcademicsemester,
  IAcademicsemesterFilter,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import httpStatus from 'http-status';

const createSemester = async (
  payload: IAcademicsemester
): Promise<IAcademicsemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  if (!result) {
    throw new Error('Faild to create Academic Semester');
  }
  return result;
};

const getAllSemesters = async (
  filters: IAcademicsemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicsemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: semesterSearchableFildes.map(field => ({
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

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicsemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicsemester>
): Promise<IAcademicsemester | null> => {
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicsemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
