import { Model, Types } from 'mongoose';

import { IUserShared } from '../../../interfaces/IUser';
import { IManagementDepartment } from '../managementDepartmant/managementDepartment.interface';

export type IAdmin = IUserShared & {
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
