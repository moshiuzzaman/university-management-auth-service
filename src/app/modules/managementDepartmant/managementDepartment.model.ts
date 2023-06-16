import { Schema, model } from 'mongoose';
import {
  ManagementDepartmentModel,
  IManagementDepartment,
} from './managementDepartment.interface';

export const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
