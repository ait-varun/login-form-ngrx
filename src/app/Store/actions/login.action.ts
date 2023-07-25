import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/Store/models/login.models';

export const LOGIN_START = createAction(
  '[Auth] Login Start',
  props<{ username: string; password: string }>()
);

export const LOGIN_SUCCESS = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const LOGIN_FAIL = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);

export const LOGOUT = createAction('[Auth] Logout');
