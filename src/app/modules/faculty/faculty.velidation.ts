import z from 'zod';
import { UserSharedUpdateZodSchema } from '../../../shared/validation';

// // Zod validation
const updateFacultyZodSchema = z.object({
  body: z.object({
    ...UserSharedUpdateZodSchema.shape,
    designation: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
