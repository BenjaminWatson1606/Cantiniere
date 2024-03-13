import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
  ){}
  
  /**
   * Get user informations from the database using its id
   * The calbback requires a valid user token and a valid user id
   * @returns Returns an observable to get user informations as USer model or undefined if the token or id are not valid
   */
  getUserInformations(): Observable<User> | undefined{
    //Check user token
    const token = this.auth.getUserToken();
    if(!token) return undefined;

    //Check user id
    let id: number | null = null;
    this.auth.userId$.subscribe(res => id = res);
    if(id == null) return undefined;

    //else, get user informtions from the ddb
    const headers = this.auth.getHttpHeader(token);
    return this.http.get(`http://localhost:8080/stone.lunchtime/user/find/${id}`, { headers: headers})
      .pipe(map(res => res as User));
  }
}
