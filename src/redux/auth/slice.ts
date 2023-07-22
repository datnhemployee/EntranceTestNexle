import {createSlice} from '@reduxjs/toolkit';
import {signUpAndSignIn} from './actions';
import {SignInResponse} from '../../services/auth';

export type AuthState = Omit<SignInResponse, 'user'> & {
  user: null | SignInResponse['user'];
};

const INITIAL_STATE: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

const Slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpAndSignIn.fulfilled, (state, action) => {
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
      state.user = action.payload?.user;
    });
  },
});

export const {reducer: AuthReducer} = Slice;
