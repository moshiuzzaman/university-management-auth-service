import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControl } from './academicFaculty.control';
const router = express.Router();

router.post(
  '/create-academicFaculty',
  ValidateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyControl.createFaculty
);

router.get('/:id', AcademicFacultyControl.getSingleFaculty);

router.get('/', AcademicFacultyControl.getAllFaculties);

router.patch(
  '/:id',
  ValidateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyControl.updateFaculty
);

router.delete('/:id', AcademicFacultyControl.deleteFaculty);

export const AcademicFacultyRoutes = router;
