import { IAcademicsemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : '0';
};

export const generateStudentId = async (
  academicSemester: IAcademicsemester | null
) => {
  const lastStudent = await findLastStudentId();
  let incrementedId = (parseInt(lastStudent) + 1).toString().padStart(5, '0');
  if (academicSemester) {
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
  }

  return incrementedId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : '0';
};

export const generateFacultyId = async () => {
  const lastFacultyId = await findLastFacultyId();

  let incrementedId = (parseInt(lastFacultyId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(2) : '0';
};

export const generateAdminId = async () => {
  const lastAdminId = await findLastAdminId();

  let incrementedId = (parseInt(lastAdminId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};
