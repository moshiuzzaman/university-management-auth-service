import z from 'zod';
import { bloodGroup, gender } from '../../../constants/user';
const nameSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const UserSharedZodSchema = z.object({
  name: nameSchema,
  gender: z.enum(gender as [string, ...string[]], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  contactNo: z.string({ required_error: 'Contact number is required' }),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
  }),
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
  profileImage: z.string().optional(),
});

// // Zod validation
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      ...UserSharedZodSchema.shape,
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({ required_error: 'Mother name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local guardian name is required' }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      ...UserSharedZodSchema.shape,
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      designation: z.string({ required_error: ' designation is required' }),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      ...UserSharedZodSchema.shape,
      managementDepartment: z.string({
        required_error: 'Management Department is required',
      }),
      designation: z.string({ required_error: ' designation is required' }),
    }),
  }),
});
export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
