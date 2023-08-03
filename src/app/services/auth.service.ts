import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginUser } from '../models/login.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://dummyjson.com/auth/login';
  constructor(private http: HttpClient) {}

  login(LoginUser: LoginUser): Observable<User> {
    return this.http.post<User>(this.url, LoginUser);
  }
}
