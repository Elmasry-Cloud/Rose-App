import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
});
