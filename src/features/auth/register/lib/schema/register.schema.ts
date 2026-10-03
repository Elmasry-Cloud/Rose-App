import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().min(1, 'email-required').email('email-invalid'),
    code: z.string().min(1, 'code-required').length(6, 'code-length'),
    firstName: z
      .string()
      .min(1, 'first-name-required')
      .min(3, 'first-name-min')
      .max(20, 'first-name-max'),
    lastName: z
      .string()
      .min(1, 'last-name-required')
      .min(3, 'last-name-min')
      .max(20, 'last-name-max'),
    username: z
      .string()
      .min(1, 'user-name-required')
      .min(3, 'user-name-invalid')
      .max(20, 'user-name-invalid'),
    phone: z
      .string()
      .min(1, 'phone-required')
      .refine(isValidPhoneNumber, { message: 'phone-invalid' }),
    gender: z.enum(['MALE', 'FEMALE'], { message: 'gender-required' }),
    password: z
      .string()
      .min(8, 'password-min')
      .regex(/[A-Z]/, 'password-uppercase')
      .regex(/[a-z]/, 'password-lowercase')
      .regex(/[0-9]/, 'password-digit')
      .regex(/[^A-Za-z0-9]/, 'password-special'),
    confirmPassword: z.string().min(1, 'confirm-password-required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'password-match',
    path: ['confirmPassword'],
  });
