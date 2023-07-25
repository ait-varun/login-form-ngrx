import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as LoginActions from './state/login.action';
import { AuthState } from './state/login.reducer';
import { Store, select } from '@ngrx/store';
import {
  selectError,
  selectLoggedIn,
  selectUser,
} from './state/login.selector';
import { Observable, filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  failedLogin = false;
  loginSuccess = false;
  isLoggedIn$: Observable<boolean>;
  error$: Observable<string | null>;
  user$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
    this.error$ = this.store.pipe(select(selectError));
    this.user$ = this.store.pipe(select(selectUser));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['kminchelle', Validators.required],
      password: ['0lelplR', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }
  onSubmit() {
    this.failedLogin = false;
    this.loginSuccess = false;
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.getRawValue();
    this.store.dispatch(
      LoginActions.LOGIN_START({
        username: formData.username,
        password: formData.password,
      })
    );

    this.isLoggedIn$
      .pipe(
        filter((value) => value),
        take(1)
      )
      .subscribe((value) => {
        this.loginSuccess = value;
        this.router.navigate(['/home']);
      });

    this.error$
      .pipe(
        filter((error) => error !== ''),
        take(1)
      )
      .subscribe(() => {
        this.failedLogin = true;
      });
  }
}
