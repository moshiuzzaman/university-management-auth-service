import { Model, Types } from 'mongoose';

import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IUserShared } from '../../../interfaces/IUser';

export type IFaculty = IUserShared & {
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
