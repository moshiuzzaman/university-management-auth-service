import z from 'zod';
import { UserSharedUpdateZodSchema } from '../../../shared/validation';

// // Zod validation
const updateAdminZodSchema = z.object({
  body: z.object({
    ...UserSharedUpdateZodSchema.shape,
    designation: z.string().optional(),
    managementDepartment: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
