import z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'user-name-required'),
  password: z.string().min(1, 'password-required'),
});
