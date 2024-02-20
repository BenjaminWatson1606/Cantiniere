import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/stone.lunchtime/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const requestBody = {
      email: email,
      password: password,
    };
    const options = {
      observe: 'response' as 'response',
    };
    return this.http.post(this.apiUrl, requestBody, options).pipe(
      map((response) => {
        const authHeader = response.headers.get('Authorization');

        if (authHeader) {
          const token = authHeader.split(' ')[1];

          if (token) {
            localStorage.setItem('token', token);
          }
        }

        return response.body;
      })
    );
  }
}
