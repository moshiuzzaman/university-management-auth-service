import { Model } from 'mongoose';

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicsemester = {
  title: IAcademicSemesterTitle;
  year: number;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
  syncId: string;
};
export type IAcademicsemesterFilter = {
  searchTerm?: string;
  title?: string;
  code?: string;
  year?: string;
};

export type AcademicSemesterModel = Model<
  IAcademicsemester,
  Record<string, unknown>
>;

export type IAcademicSemesterFromEvent = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
