import { Model, Types } from 'mongoose';

import { IAcademicsemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};
export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type IStudent = {
  studentId: string;
  name: IUserName;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  academicSemester: Types.ObjectId | IAcademicsemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilter = {
  searchTerm?: string;
  email?: string;
  studentId?: string;
  gender?: string;
  bloodGroup?: string;
  contactNo?: string;
};
