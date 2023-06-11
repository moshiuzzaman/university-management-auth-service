import { Schema, model } from 'mongoose';
import {
  IAcademicsemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicsemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const existingSemester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  }).exec();

  if (existingSemester) {
    throw new ApiError(status.CONFLICT, '😡 Semister already exist !');
  }
  next();
});

export const AcademicSemester = model<IAcademicsemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
