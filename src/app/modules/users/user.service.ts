import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  if (!academicSemester) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Academic Semester Id');
  }

  // generate student id
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);

    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create student');
    }
    // set student _id into User.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Faild to create student at user'
      );
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession;
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.find({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData[0];
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_Faculty_pass as string;
  }
  // set role
  user.role = 'faculty';

  // generate Faculty id
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();

    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create Faculty');
    }
    // set Faculty _id into User.Faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Faild to create Faculty at user'
      );
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession;
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.find({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData[0];
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_Admin_pass as string;
  }
  // set role
  user.role = 'admin';

  // generate Admin id
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();

    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faild to create Admin');
    }
    // set Admin _id into User.Admin
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Faild to create Admin at user'
      );
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession;
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.find({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newUserAllData[0];
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
