import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterControl } from './academicSemester.control';
const router = express.Router();

router.post(
  '/create-academicSemester',
  ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterControl.createSemester
);

router.get('/:id', AcademicSemesterControl.getSingleSemester);

router.get('/', AcademicSemesterControl.getAllSemesters);

router.patch(
  '/:id',
  ValidateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterControl.updateSemester
);

router.delete('/:id', AcademicSemesterControl.deleteSemester);

export const AcademicSemesterRoutes = router;
