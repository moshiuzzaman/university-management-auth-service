import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllfaculties);
router.patch(
  '/:id',
  ValidateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
