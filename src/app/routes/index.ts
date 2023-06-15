import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { AcademicFacultyRoutes } from './../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/academicSemesters/',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academicFaculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];
// Application routs
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
