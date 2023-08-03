import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/login.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedIn = createSelector(selectAuthState, (state) =>
  state.loggedIn ? true : false
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectUserName = createSelector(
  selectAuthState,
  (state) => state.user.firstName
);
