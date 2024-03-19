import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  /**
   * Refreshes user data from the server
   */
  private refreshUserData(): Observable<User[]> {
    const token = this.auth.getUserToken();
    if (!token) {
      return throwError('User token is not available.');
    }

    const url = 'http://localhost:8080/stone.lunchtime/user/findall';
    return this.http.get<User[]>(url, { headers: this.auth.getHttpHeader(token) }).pipe(
      map((res) => {
        let users = res as User[];
        users = users.filter((u) => u.isLunchLady === false);
        return users;
      }),
      catchError((error) => {
        console.error('Failed to fetch user information:', error);
        return throwError('Failed to fetch user information.');
      })
    );
  }

  /**
   * Credit a user with a specific amount
   * @param userId The ID of the user to credit
   * @param amount The amount to credit
   * @returns Observable indicating success or failure
   */
  creditUser(userId: number, amount: number): Observable<User> {
    const token = this.auth.getUserToken();
    if (!token) {
      return throwError('User token is not available.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `http://localhost:8080/stone.lunchtime/user/credit/${userId}?amount=${amount}`;

    return this.http.post<any>(url, {}, { headers }).pipe(
      switchMap(() => this.getUserInformation(userId)), // Fetch updated user information
      catchError((error) => {
        console.error('Failed to credit user:', error);
        return throwError('Failed to credit user.');
      })
    );
  }

    /**
   * Debit a user with a specific amount
   * @param userId The ID of the user to debit
   * @param amount The amount to debit
   * @returns Observable indicating success or failure
   */
    debitUser(userId: number, amount: number): Observable<User> {
      const token = this.auth.getUserToken();
      if (!token) {
        return throwError('User token is not available.');
      }
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      const url = `http://localhost:8080/stone.lunchtime/user/debit/${userId}?amount=${amount}`;
  
      return this.http.post<any>(url, {}, { headers }).pipe(
        switchMap(() => this.getUserInformation(userId)), // Fetch updated user information
        catchError((error) => {
          console.error('Failed to debit user:', error);
          return throwError('Failed to debit user.');
        })
      );
    }

  /**
   * Get an observable that returns all users from the database
   * Doesn't include admin accounts in the returned output
   */
  getAllUsers(): Observable<User[]> {
    const token = this.auth.getUserToken();
    if (!token) {
      return throwError('User token is not available.');
    }

    const url = 'http://localhost:8080/stone.lunchtime/user/findall';
    return this.http.get<User[]>(url, { headers: this.auth.getHttpHeader(token) }).pipe(
      map((res) => {
        let users = res as User[];
        users = users.filter((u) => u.isLunchLady === false);
        return users;
      }),
      catchError((error) => {
        console.error('Failed to fetch user information:', error);
        return throwError('Failed to fetch user information.');
      })
    );
  }

   /**
   * Get user information from the database using its id
   * The callback requires a valid user token and a valid user id
   * @returns Returns an observable to get user information as User model or undefined if the token or id are not valid
   */
   getUserInformations(): Observable<User | undefined> {
    const token = this.auth.getUserToken();
    let id;
    this.auth.userId$.subscribe((res) => (id = res));
    if (!token || !id) return throwError('User token or ID is not valid.');

    // else, get user information from the database
    const headers = this.auth.getHttpHeader(token);
    return this.http
      .get(`http://localhost:8080/stone.lunchtime/user/find/${id}`, {
        headers: headers,
      })
      .pipe(
        map((res) => res as User),
        catchError((error) => {
          console.error('Failed to fetch user information:', error);
          return throwError('Failed to fetch user information.');
        })
      );
  }

  /**
   * Get user information from the database using its id
   * @param userId The ID of the user
   * @returns Returns an observable to get user information as User model
   */
  getUserInformation(userId: number): Observable<User> {
    const token = this.auth.getUserToken();
    if (!token) {
      return throwError('User token is not available.');
    }

    const headers = this.auth.getHttpHeader(token);

    return this.http
      .get<User>(`http://localhost:8080/stone.lunchtime/user/find/${userId}`, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch user information:', error);
          return throwError('Failed to fetch user information.');
        })
      );
  }
}
