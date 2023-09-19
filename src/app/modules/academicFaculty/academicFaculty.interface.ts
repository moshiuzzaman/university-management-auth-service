import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
  syncId: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilter = {
  searchTerm?: string;
  title?: string;
};

export type IAcademicFacultyEvent = {
  title: string;
  id: string;
};
