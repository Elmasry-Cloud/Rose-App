export const userRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type USER_ROLE = (typeof userRole)[keyof typeof userRole];
