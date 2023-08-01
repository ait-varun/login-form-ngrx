import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace this with your API endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch data from the API
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        // Handle error, e.g., display a message or log it
        console.error('API error:', error);
        return []; // Return an empty array or any other default value
      })
    );
  }
}
