import { model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import { Schema } from 'mongoose';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
