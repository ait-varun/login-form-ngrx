import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.action';
import { User } from 'src/app/models/login';

export interface AuthState {
  loggedIn: boolean;
  error: string;
  user: User;
}

export const initialState: AuthState = {
  loggedIn: false,
  error: '',
  user: {
    username: '',
    password: '',
  },
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.LOGIN_START, (state) => ({
    ...state,
    error: '',
  })),
  on(LoginActions.LOGIN_SUCCESS, (state, action) => ({
    ...state,
    user: action.user,
    loggedIn: true,
  })),
  on(LoginActions.LOGIN_FAIL, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(LoginActions.LOGOUT, (state) => ({
    ...state,
    loggedIn: false,
    user: {
      username: '',
      password: '',
    },
    error: '',
  }))
);
