import { Injectable } from '@angular/core';
import { Meal } from '../interfaces/meal-model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  
  /**
   * List of the different meals (API request in the future)
   * @returns An array of Meal objects
   */
  getMeals(): Meal[]{
    let meals = [
      {label: "Coca", price: 1, category: "Boissons", categoryIndex: 9},
      {label: "Eau", price: 1, category: "Boissons", categoryIndex: 9},
      {label: "Sandwich poulet", price: 3.5, category: "Sandwichs", categoryIndex: 10},
      {label: "Soupe de légumes", price: 2.5, category: "Soupes", categoryIndex: 7},
      {label: "Muffin", price: 1.5, category: "Desserts", categoryIndex: 5},
      {label: "Quiche", price: 5, category: "Plats principaux", categoryIndex: 3},
      {label: "Steak frites", price: 5, category: "Plats principaux", categoryIndex: 3},
      {label: "Barre Lion", price: 1.5, category: "Snacks", categoryIndex: 11}
    ]
    return meals.sort((a, b) => a.categoryIndex > b.categoryIndex ? 1 : -1);
  }

  /**
   * List of the different meal categories (API request in the future)
   * @returns An array of string that contains all the different meal categories
   */
  getMealCategories(): string[]
  {
    return [
      "unknown",
      "appetizers", 
      "starters", 
      "main_dishes", 
      "others", 
      "desserts", 
      "brunchs_and_lunches", 
      "soups", 
      "sauces", 
      "drinks", 
      "sandwiches", 
      "snacks"
    ]
  }
}
