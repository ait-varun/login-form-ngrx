import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { LOGIN_SUCCESS } from './Store/actions/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'login-form-ngrx';

  constructor(private store: Store) {}
  ngOnInit() {
    const storedUser : string | null = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.store.dispatch(LOGIN_SUCCESS({ user }));
    }
  }
}
