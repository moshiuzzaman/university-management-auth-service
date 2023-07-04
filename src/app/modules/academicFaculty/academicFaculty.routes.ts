import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

const role = ENUM_USER_ROLE;

router.post(
  '/create-academicFaculty',
  ValidateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(role.SUPER_ADMIN, role.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(role.SUPER_ADMIN, role.ADMIN, role.FACULTY, role.STUDENT),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  ValidateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  auth(role.SUPER_ADMIN, role.ADMIN, role.FACULTY),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(role.SUPER_ADMIN, role.ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(role.SUPER_ADMIN, role.ADMIN),
  AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
