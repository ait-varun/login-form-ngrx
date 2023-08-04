import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as LoginActions from '../Store/actions/login.action';
import { AuthState } from '../Store/reducers/login.reducer';
import { Store, select } from '@ngrx/store';
import {
  selectError,
  selectLoggedIn,
  selectUser,
} from '../Store/selectors/login.selector';
import { Observable, filter, take } from 'rxjs';
import { LoginUser } from '../models/login.models';

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
      username: ['', Validators.required],
      password: ['', Validators.required],
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
    const formData: LoginUser = this.form.getRawValue();
    this.store.dispatch(
      LoginActions.LOGIN_START({
        loginUser: {
          username: formData.username,
          password: formData.password,
        },
      })
    );

    this.isLoggedIn$
      // .pipe(...): The pipe() function is used to chain multiple operators together. In this code, it's used to apply a series of operations on the isLoggedIn$ observable.
      .pipe(
        // filter((value) => value): The filter() operator is used to filter the emitted values from the observable based on a condition. In this case, it filters out any "falsy" values (e.g., false, null, undefined, 0) and only allows "truthy" values to pass through. This means the code inside the .subscribe() function will only be executed when isLoggedIn$ emits a truthy value.
        filter((value) => value),
        // take(1): The take() operator is used to take a specified number of values from the observable. In this case, take(1) means that only the first emitted value will be considered, and then the observable will automatically complete, unsubscribing from further emissions. This ensures that the subscription is automatically unsubscribed after the first emission, preventing memory leaks.
        take(1)
      )
      .subscribe((value) => {
        // .subscribe((value) => { ... }): The subscribe() function is where you define the behavior that will be executed when the observable emits a value that passes through the filtering and taking operations.
        this.loginSuccess = value;
        // (value) => { ... }: This is an arrow function that takes the emitted value from the observable as its argument. In this case, the emitted value will be a truthy value (since it passed through the filter).
        this.router.navigate(['/user']);
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
