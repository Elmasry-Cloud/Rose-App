import { z } from 'zod';

export type RegisterFormValue = z.infer<typeof registerSchema>;
