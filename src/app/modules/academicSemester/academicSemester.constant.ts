import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semesterSearchableFildes = ['title', 'code', 'year'];
export const semesterFilterableFildes = ['searchTerm', 'title', 'code', 'year'];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester-created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester-updated';
export const EVENT_ACADEMIC_SEMESTER_DELETED = 'academic-semester-deleted';
