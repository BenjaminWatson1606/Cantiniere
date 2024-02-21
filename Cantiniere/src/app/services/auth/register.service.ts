import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/stone.lunchtime/user/register';

  constructor(private http: HttpClient) {}

  // Method to make the HTTP request for user registration
  registerUser(userData: any) {
    return this.http.post(this.apiUrl, userData).toPromise();
  }
}
