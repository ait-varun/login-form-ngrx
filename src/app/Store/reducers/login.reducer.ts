import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.action';
import { User } from 'src/app/Store/models/login.models';

export interface AuthState {
  loggedIn: boolean;
  error: string;
  user: User;
}

export const initialState: AuthState = {
  loggedIn: false,
  error: '',
  user: {
    id: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    token: '',
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
    user: initialState.user,
    error: '',
  }))
);
