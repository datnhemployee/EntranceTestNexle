import {SignInSuccess} from '../mock/auth';
import BaseApi from './base';

export type SignUpPayload = {
  email: string;
  password: string;
};
export type SignUpOpts =
  | Partial<{
      firstName: string;
      lastName: string;
    }>
  | undefined;

const signUp = async (payload: SignUpPayload, opts?: SignUpOpts) => {
  // const response = await BaseApi.post('auth/signup', {
  //   ...opts,
  //   ...payload,
  // });
  // return response?.data;
};

type SignInPayload = {
  email: string;
  password: string;
};
export type SignInResponse = {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
};
const signIn = async (payload: SignInPayload) => {
  // const response = await BaseApi.post('auth/signup', payload);
  // return response?.data as SignInResponse;
  return SignInSuccess;
};

const AuthService = {
  signUp,
  signIn,
};

export default AuthService;
