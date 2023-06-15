import { z } from 'zod';
import { bloodGroup, gender } from '../constants/user';

const nameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const UserSharedUpdateZodSchema = z.object({
  id: z.string().optional(),
  name: nameSchema.optional(),
  gender: z.enum(gender as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
  profileImage: z.string().optional(),
});
