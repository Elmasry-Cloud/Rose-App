import { z } from 'zod';
import { registerSchema } from '../schema/register.schema';

export type RegisterFormValue = z.infer<typeof registerSchema>;
