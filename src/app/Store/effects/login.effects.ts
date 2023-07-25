import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as LoginActions from '../actions/login.action';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LOGIN_START),
      mergeMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((user) => {
            this.authService.setUserInLocalStorage(user);
            return LoginActions.LOGIN_SUCCESS({ user });
          }),
          catchError((error) => {
            return of(LoginActions.LOGIN_FAIL({ error }));
          })
        );
      })
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
