import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

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
    student.studentId = id;
    console.log(student.studentId);

    const newStudent = await Student.create([student], { session });
    console.log(newStudent[0].studentId);

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

export const UserService = {
  createStudent,
};
