import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Order } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
    ) { }

  /**
   * Return an observable that contains an array with user orders
   * @param status Returned order status
   * @param beginDate A start date
   * @param endDate An end date
   * @returns Returns an observable with an array of orders or undefined
   */
  getLocalUserOrders(status: 'CREATED'|'DELIVERED'|'CANCELLED' = 'CREATED', beginDate: string = '', endDate: string = '')
  : Observable<Order[]> | undefined
  {
    const token = this.auth.getUserToken();
    let id;
    this.auth.userId$.subscribe(res => id = res);
    if(!token || !id) return undefined; //Check user token / id

    //else, get user informtions from the ddb
    return this.ordersRequest(token, id, status, beginDate, endDate);
  }

  /**
   * Return an observable that contains an array with user orders
   * @param userId User id
   * @param status Returned order status
   * @param beginDate A start date
   * @param endDate An end date
   * @returns Returns an observable with an array of orders or undefined
   */
  getOrdersByUserId(userId: number, status: 'CREATED'|'DELIVERED'|'CANCELLED' = 'CREATED', beginDate: string = '', endDate: string = '')
  : Observable<Order[]> | undefined
  {
    const token = this.auth.getUserToken();
    if(!token) return undefined; //Check user token / id

    //else, get user informtions from the ddb
    return this.ordersRequest(token, userId, status, beginDate, endDate);
  }

  /**
   * Get orders observable for a given user by id
   * @param token local user token
   * @param id user id
   * @param status Returned order status
   * @param beginDate A start date
   * @param endDate An end date
   * @returns Returns an observable with an array of orders or undefined
   */
  private ordersRequest(
    token: string, id: number, status: 'CREATED'|'DELIVERED'|'CANCELLED' = 'CREATED', 
    beginDate: string = '', endDate: string = '')
  : Observable<Order[]> | undefined
  {
    const headers = this.auth.getHttpHeader(token);
    const url = `http://localhost:8080/stone.lunchtime/order/findallforuser/${id}?status=${status}&beginDate=${beginDate}&endDate=${endDate}`;
    return this.http.get(url, { headers: headers})
      .pipe(map(res => res as Order[]));
  }

  /**
   * Get the day and the date for a given order
   * @param order Order to get the date from
   * @returns Returns an object with the day and the date for the given order
   */
  getOrderDate(order: Order){
    const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    const localDate = new Date(order.creationDate);
    return {
      day: weekday[localDate.getDay()],
      date: localDate,
    };
  }
}
