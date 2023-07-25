import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthState } from '../login/state/login.reducer';
import * as LoginActions from '../login/state/login.action';
import {
  selectLoggedIn,
  selectUser,
  selectUserName,
} from '../login/state/login.selector';
import { Observable } from 'rxjs';
import { User } from '../models/login';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  isLoggedIn$: Observable<boolean>;
  userName$: Observable<any>;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.isLoggedIn$ = this.store.select(selectLoggedIn);
    this.user$ = this.store.select(selectUser);
    this.userName$ = this.store.select(selectUserName);
  }

  onLogout() {
    this.store.dispatch(LoginActions.LOGOUT());
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
