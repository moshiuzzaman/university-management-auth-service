import { SortOrder } from 'mongoose';

import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
  IAcademicDepartmentFromEvent,
} from './academicDepartment.interfaces';
import { AcademicDepartment } from './academicDepartment.model';
import { IPaginationOptions } from '../../../interfaces/IpaginationOptions';
import IGenericResponse from '../../../interfaces/IGenericResponse';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

const createDepartmentFromEvent = async (
  payload: IAcademicDepartmentFromEvent
): Promise<void> => {
  await AcademicDepartment.create({
    title: payload.title,
    academicFaculty: payload.academicFacultyId,
    syncId: payload.id,
  });
};

const updateDepartmentFromEvent = async (
  payload: IAcademicDepartmentFromEvent
): Promise<void> => {
  await AcademicDepartment.findOneAndUpdate(
    { syncId: payload.id },
    {
      title: payload.title,
      academicFaculty: payload.academicFacultyId,
    }
  );
};

const deleteDepartmentFromEvent = async (id: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId: id });
};

export const AcademicDepartmentService = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
  createDepartmentFromEvent,
  updateDepartmentFromEvent,
  deleteDepartmentFromEvent,
};
