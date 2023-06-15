import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middlewares/velidateRequest';
import { StudentValidation } from './student.velidation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.patch(
  '/:id',
  ValidateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
