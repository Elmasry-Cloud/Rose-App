import { z } from 'zod';

// Forget Password Schema
export const forgetPasswordSchema = z.object({
  email: z.string().min(1, 'email-required').email('email-invalid'),
  redirectUrl: z.string(),
});

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    token: z.string(),
    newPassword: z
      .string()
      .min(8, 'password-min')
      .regex(/[A-Z]/, 'password-uppercase')
      .regex(/[a-z]/, 'password-lowercase')
      .regex(/[0-9]/, 'password-digit')
      .regex(/[^A-Za-z0-9]/, 'password-special'),
    confirmPassword: z.string().min(1, 'confirm-password-required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'password-do-not-match',
    path: ['confirmPassword'],
  });

// Forget Password Form Value Type
export type TForgetPasswordFormValue = z.infer<typeof forgetPasswordSchema>;

// Reset Password Form Value Type
export type TResetPasswordFormValue = z.infer<typeof resetPasswordSchema>;
