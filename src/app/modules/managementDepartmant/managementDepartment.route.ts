import express from 'express';
import ValidateRequest from '../../middlewares/velidateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.velidation';
const router = express.Router();

router.post(
  '/create-management',
  ValidateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.patch(
  '/:id',
  ValidateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

export const ManagementDepartmentRoutes = router;
