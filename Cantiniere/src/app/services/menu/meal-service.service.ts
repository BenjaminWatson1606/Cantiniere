import { Injectable } from '@angular/core';
import { Meal } from '../../interfaces/meal-model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  
  /**
   * Categories defined in the database
   */
  categories: string[] = 
  [
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

  /**
   * Category display names array 
   */
  private categoryNames: string[] = 
  [
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

  /**
   * List of the different meals (API request in the future)
   * @returns An array of Meal objects
   */
  //TODO : combler avec des requetes api (récupérer les données de l'api et les convertir en tableau de Meal)
  getMeals(): Meal[]{
    let meals = [
      {label: "Coca", price: 1, category: "drinks", categoryIndex: 9},
      {label: "Eau", price: 1, category: "drinks", categoryIndex: 9},
      {label: "Sandwich poulet", price: 3.5, category: "sandwiches", categoryIndex: 10},
      {label: "Soupe de légumes", price: 2.5, category: "soups", categoryIndex: 7},
      {label: "Muffin", price: 1.5, category: "desserts", categoryIndex: 5},
      {label: "Quiche", price: 5, category: "main_dishes", categoryIndex: 3},
      {label: "Steak frites", price: 5, category: "main_dishes", categoryIndex: 3},
      {label: "Barre Lion", price: 1.5, category: "snacks", categoryIndex: 11}
    ]
    return meals.sort((a, b) => a.categoryIndex > b.categoryIndex ? 1 : -1);
  }

  /**
   * Get the display name of the given category
   * @param category The category to get the name of 
   * @returns Returns the name of the category as a string or undefined (if the category doesn't exist in the array)
   */
  getCategoryName(category: string): string | undefined{
    const index = this.categories.findIndex(x => x == category);
    return index >= 0 ? this.categoryNames[index] : undefined;
  }
}
