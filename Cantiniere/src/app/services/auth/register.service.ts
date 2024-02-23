import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/stone.lunchtime/user/register';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  // Method to make the HTTP request for user registration
  registerUser(userData: any) {
    return this.http.post(this.apiUrl, userData).toPromise()
      .then((response: any) => {
        // Log in the user after successful registration
        this.loginService.login(userData.email, userData.password).subscribe(
          (loginResponse) => {
            console.log('User logged in after registration:', loginResponse);
          },
          (loginError) => {
            console.error('Error logging in after registration:', loginError);
          }
        );
        return response;
      });
  }
}
