import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  passwordChangedAt: Date;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
};

// if i use static method
export type UserModel = {
  isUserExist(id: string, type?: boolean): Promise<Partial<IUser>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// if i use instance method
// export type IUserMethods = {
//
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
