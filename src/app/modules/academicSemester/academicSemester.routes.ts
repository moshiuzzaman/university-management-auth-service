import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-academicSemester',
  ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

router.patch(
  '/:id',
  ValidateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
