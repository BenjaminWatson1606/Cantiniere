import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private firstNameSubject = new BehaviorSubject<string | null>(null);
  private lastNameSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);

  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  userRole$: Observable<string | null> = this.userRoleSubject.asObservable();
  firstName$: Observable<string | null> = this.firstNameSubject.asObservable();
  lastName$: Observable<string | null> = this.lastNameSubject.asObservable();
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  constructor() {
    this.updateAuthenticationStatus();
  }

  public updateAuthenticationStatus() {
    const isAuthenticated = this.isAuthenticated();
    this.isAuthenticatedSubject.next(isAuthenticated);

    if (isAuthenticated) {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        console.log('Decoded Token:', decodedToken);

        const userRole: string | null = decodedToken.roles
          ? decodedToken.roles[0]
          : null;
        const userId: number | null = decodedToken.user
          ? decodedToken.user.id
          : null;
        const firstName: string | null = decodedToken.user
          ? decodedToken.user.firstname
          : null;
        const lastName: string | null = decodedToken.user
          ? decodedToken.user.name
          : null;

        console.log('User ID:', userId);
        console.log('User Role:', userRole);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);

        this.userIdSubject.next(userId);
        this.userRoleSubject.next(userRole);
        this.firstNameSubject.next(firstName);
        this.lastNameSubject.next(lastName);
      }
    }
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
    if (!value) {
      this.userRoleSubject.next(null);
      this.userIdSubject.next(null);
      this.firstNameSubject.next(null);
      this.lastNameSubject.next(null);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getFirstName(): Observable<string | null> {
    return this.firstName$;
  }

  getUserRole(): Observable<string | null> {
    return this.userRole$;
  }

}
