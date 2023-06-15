import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type IUserShared = {
  name: IUserName;
  id: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImage?: string;
};
export type UserSharedModel = Model<IUserShared, Record<string, unknown>>;

export type IUserFilter = {
  searchTerm?: string;
  email?: string;
  id?: string;
  gender?: string;
  bloodGroup?: string;
  contactNo?: string;
};
