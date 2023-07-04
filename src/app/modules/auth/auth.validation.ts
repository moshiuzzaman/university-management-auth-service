import z from 'zod';

// // Zod validation
const loginAuthZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: '🥱 Id is required.' }),
    password: z.string({ required_error: '🥱 Password is required.' }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: '🥱 refreshToken is required.' }),
  }),
});
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: '🥱 oldPassword is required.' }),
    newPassword: z.string({ required_error: '🥱 newPassword is required.' }),
  }),
});
export const AuthValidation = {
  loginAuthZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
