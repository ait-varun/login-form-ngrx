import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as LoginActions from '../actions/login.action';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LOGIN_START),
      mergeMap(({ loginUser }) => {
        return this.authService.login(loginUser).pipe(
          map((user) => {
            localStorage.setItem('userData', JSON.stringify(user));
            return LoginActions.LOGIN_SUCCESS({ user });
          }),
          catchError((error) => {
            return of(LoginActions.LOGIN_FAIL({ error: error.message }));
          })
        );
      })
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
