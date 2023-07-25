import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/login.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://dummyjson.com/auth/login';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.url, {
      username: username,
      password: password,
    });
  }
}
