import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthState } from '../login/state/login.reducer';
import * as LoginActions from '../login/state/login.action';
import { selectLoggedIn, selectUserName } from '../login/state/login.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  userName = '';
  isLoggedIn$: Observable<boolean>;
  userName$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.isLoggedIn$ = this.store.select(selectLoggedIn);
    this.userName$ = this.store.select(selectUserName);
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.store.dispatch(LoginActions.LOGIN_SUCCESS({ user }));
    }
  }

  onLogout() {
    this.store.dispatch(LoginActions.LOGOUT());
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
