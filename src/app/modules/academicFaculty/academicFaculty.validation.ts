import { z } from 'zod';

// // Zon validation
const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: '🤩 Year is required',
    }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: '🤩 Year is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
