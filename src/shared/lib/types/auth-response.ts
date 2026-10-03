import { USER_ROLE } from '../auth/constant/role.constant';

export interface IUser {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  phone: string;
  phoneVerified: boolean;
  role: USER_ROLE;
  username: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
