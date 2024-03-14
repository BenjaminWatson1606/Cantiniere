import { Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { User } from 'src/app/interfaces/user';
import { Order } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
  ){}
  
  //#region Single User Methods
  /**
   * Get user informations from the database using its id
   * The calbback requires a valid user token and a valid user id
   * @returns Returns an observable to get user informations as USer model or undefined if the token or id are not valid
   */
  getUserInformations(): Observable<User> | undefined{
    const token = this.auth.getUserToken();
    let id;
    this.auth.userId$.subscribe(res => id = res);
    if(!token || !id) return undefined; //Check user token / id

    //else, get user informtions from the ddb
    const headers = this.auth.getHttpHeader(token);
    return this.http.get(`http://localhost:8080/stone.lunchtime/user/find/${id}`, { headers: headers})
      .pipe(map(res => res as User));
  }
  //#endregion

  //#region Global Users Methods
  /**
   * Get an observable that returns all users from database
   * Don't include admin accounts in the returned output
   */
  getAllUsers(): Observable<User[]> | undefined{
    const token = this.auth.getUserToken();
    if(!token) return undefined; //Check user token / id

    const url = 'http://localhost:8080/stone.lunchtime/user/findall';
    return this.http.get(url, { headers: this.auth.getHttpHeader(token)})
      .pipe(map(res => {
        let users = res as User[];
        users = users.filter(u => u.isLunchLady === false);
        return users;
      }));
  }
  //#endregion
}
