import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable, map } from 'rxjs';

import { Menu } from 'src/app/interfaces/menu';
import { MealService } from '../meal/meal.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  /**
   * Get an observable that returns an array containing all of the menus stored in the database
   * @returns Returns an observable to get an array of menus or undefined
   */
  getAllMenus(): Observable<any> | undefined {
    const token = this.auth.getUserToken();
    if (!token) return undefined;

    const url = "http://localhost:8080/stone.lunchtime/menu/findall";
    const headers = this.auth.getHttpHeader(token);
    return this.http.get<Menu[]>(url, { headers: headers })
      .pipe(map(menus => menus.filter(menu => menu.status === "ENABLED" || menu.status === "DISABLED")));
  }

  addMenu(menu: Menu): Observable<any> | undefined {
    const token = this.auth.getUserToken();
    if (!token) return undefined;

    const url = 'http://localhost:8080/stone.lunchtime/menu/add';
    const body = JSON.stringify(menu); 
    const headers = this.auth.getHttpHeader(token);
    return this.http.put(url, body, { headers: headers });
  }

  updateMenu(menu: Menu): Observable<Menu> | undefined {
    const token = this.auth.getUserToken();
    if (!token) return undefined;

    const url = `http://localhost:8080/stone.lunchtime/menu/update/${menu.id}`;
    const headers = this.auth.getHttpHeader(token);

    //Convert meals array to an array of meal ids
    const mealIds: number[] = [];
    menu.meals.forEach(meal => mealIds.push(meal.id));
    const body = {
      label: menu.label,
      priceDF: menu.priceDF,
      mealIds: mealIds,
    };
    return this.http.patch<Menu>(url, JSON.stringify(body), { headers: headers });
  }

  deleteMenu(menuId: number): Observable<boolean> | undefined {
    const token = this.auth.getUserToken();
    if (!token) return undefined;

    const url = `http://localhost:8080/stone.lunchtime/menu/delete/${menuId}`;
    const headers = this.auth.getHttpHeader(token);
    return this.http.delete<boolean>(url, { headers: headers });
  }
}
