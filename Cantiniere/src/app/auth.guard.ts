import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from './services/auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      // User is not authenticated, redirect to menu
      this.router.navigate(['/menu']);
      return false;
    }

    // Check user role
    const userRole = this.authService.getLocalUserRole();
    console.log('User Role ' + userRole);

    // Define admin routes that require 'ROLE_LUNCHLADY' role
    const adminRoutes = [
      '/admin',
      '/admin-menu',
      '/admin-order-recap',
      '/admin-user-accounts',
      '/admin-configuration',
    ];

    // Check if the user is trying to access an admin route without the proper role
    if (adminRoutes.includes(state.url) && userRole != 'ROLE_LUNCHLADY') {
      console.log('Redirecting');
      this.router.navigate(['/menu']);
      return false;
    }

    return true;
  }
}
