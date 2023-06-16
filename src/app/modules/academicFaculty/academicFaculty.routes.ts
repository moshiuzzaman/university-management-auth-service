import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academicFaculty',
  ValidateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

router.patch(
  '/:id',
  ValidateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
