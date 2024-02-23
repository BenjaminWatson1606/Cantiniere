import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Meal } from 'src/app/interfaces/meal-model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  /**
   * Meal category array based on the enum in the database
   */
  private categories = [
    "UNKNOWN",
    "APPETIZERS", 
    "STARTERS", 
    "MAIN_DISHES",
    "OTHERS", 
    "DESSERTS", 
    "SOUPS", 
    "SAUCES", 
    "DRINKS", 
    "SANDWICHES", 
    "SNACKS"
  ];

  /**
   * Template names of the meal categories
   */
  private templateNames = [
    "Inconnues",
    "Apéritifs", 
    "Entrées", 
    "Plats principaux", 
    "Autres", 
    "Desserts", 
    "Brunchs et déjeuners", 
    "Soupes", 
    "Sauces", 
    "Boissons", 
    "Sandwichs", 
    "Snacks"
  ]

  constructor(private http: HttpClient){}
  
  /**
   * Get the array of meal categories
   */
  getMealCategories(): string[]{
    return this.categories;
  }

  /**
   * Get the template name of a given meal category
   * @param category The meal category to get the template name of
   * @returns Return the template name of the meal category as a string
   */
  getTemplateName(category: string): string{
    const index = this.getCategoryId(category);
    return index >= 0 ? this.templateNames[index] : '';
  }

  /**
   * Get the index of the given category from the meal category array
   * @param category The meal category to get the index of
   * @returns Returns the given category index as a number
   */
  private getCategoryId(category: string): number{
    return this.categories.findIndex(c => c == category);
  }

  /**
   * Get an observable data flow to get weekly meals data from the database
   * @returns Returns a piped observable data flow to get an array of Meal objects
   */
  getWeeklyMeals(): Observable<Meal[]>{
    const url = "http://localhost:8080/stone.lunchtime/meal/findallavailableforthisweek";
    return this.http.get<any[]>(url).pipe(map(response => response.map(res => (res as Meal))));
  }

    /**
   * Get an observable data flow to get daily meals data from the database
   * @returns Returns a piped observable data flow to get an array of Meal objects
   */
    getDailyMeals(): Observable<Meal[]>{
      const url = "http://localhost:8080/stone.lunchtime/meal/findallavailablefortoday";
      return this.http.get<any[]>(url).pipe(map(response => response.map(res => res as Meal)));
    }

  /**
   * Get available meal array based on a given meal category
   * @param meals Meals array to filter
   * @param category The meal category to get meals of
   * @returns Returns an array containing meals for the given meal category or undefined (if the category doesn't exist)
   */
  getMealOfCategory(meals: Meal[], category: string): Meal[] | undefined{
    const index = this.getCategoryId(category);
    if(index <= -1){
      console.log("No meals found");
      return undefined;
    }
    //else
    const output: Meal[] = [];
    for(let meal of meals){
      if(meal.category == category)
        output.push(meal);
    }
    return output
  }

  /**
   * Use a patch request to update meal's informations in the database
   * @param meal The meal from the database to update
   */
  updateMeal(meal: Meal): Observable<Meal> | undefined{
    const token = this.getUserToken();
    if(!token) return undefined;
    
    const url = `http://localhost:8080/stone.lunchtime/meal/update/${meal.id}`;
    const body = JSON.stringify(meal);
    const headers = this.getHttpHeader(token);

    return this.http.patch(url, body, { headers: headers })
      .pipe(map(res => res as Meal));
  }

  /**
   * Use a put request to add a new meal to the database
   * @param meal The meal to add to the database
   */
  addMeal(meal: Meal): Observable<Meal> | undefined{
    const token = this.getUserToken();
    if(!token) return undefined;

    const url = 'http://localhost:8080/stone.lunchtime/meal/add';
    const body = JSON.stringify(meal);
    const headers = this.getHttpHeader(token);

    return this.http.put(url, body, { headers: headers })
      .pipe(map(res => res as Meal));
  }

  /**
   * Use a delete request to delete a given meal from the database
   * @param meal Meal object to delete from the database
   */
  removeMeal(meal: Meal): Observable<any> | undefined{
    const token = this.getUserToken();
    if(!token) return undefined;

    const url = `http://localhost:8080/stone.lunchtime/meal/delete/${meal.id}`;
    const headers = this.getHttpHeader(token);

    return this.http.delete(url, {headers: headers});
  }

  /**
   * Create a new http request header with Authorization and Content-Type set
   * @param token User token value
   * @returns Returns an HttpHeaders object set with the user token and content type as json
   */
  getHttpHeader(token: string): HttpHeaders{
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    })
  }

  /**
   * Checking if there's an existing token in the local storage
   * @returns Return the token value or null if it doesn't exist
   */
  getUserToken(): string | null{
    const tokenValue = localStorage.getItem('token');
    if(tokenValue)
      return tokenValue;
    else{
      console.error('No token found.');
      return null;
    }
  }
}
