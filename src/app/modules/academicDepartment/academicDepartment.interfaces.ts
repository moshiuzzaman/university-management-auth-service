import { Model, Types } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: string;
  syncId: string;
};

export type IAcademicDepartmentFromEvent = {
  title: string;
  academicFacultyId: string;
  id: string;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
