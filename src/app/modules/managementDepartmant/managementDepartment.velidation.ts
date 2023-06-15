import z from 'zod';

// // Zod validation
const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const ManagementDepartmentValidation = {
  updateManagementDepartmentZodSchema,
  createManagementDepartmentZodSchema,
};
