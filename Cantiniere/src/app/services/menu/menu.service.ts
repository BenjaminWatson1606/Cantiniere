import { Injectable, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
import { Menu } from 'src/app/interfaces/menu-model';

@Injectable({
  providedIn: 'root'
})
export class MenuService{
  
  menu: Menu = this.getMenu();

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
  * Return an array from a given meal array.
  * @param meals Meal array that contains the different meals of the menu
  * @returns A menu containing meals and their categories
  */
  getMenu()
  {
    const meals: Meal[] = this.getMeals();
    let menu: Menu = {categories: []} as Menu;
    for(let meal of meals)
    {
      //Checking if its category already exists
      const index = menu.categories.findIndex(x => x.label == meal.category);
      
      //If it exists, add the meal to the category
      if(index > -1)
        menu.categories[index].meals.push(meal);
      //Else, create a new category in the menu and add the given meal
      else
      {
        menu.categories.push({label: meal.category, meals: []})
        const newIndex = menu.categories.findIndex(x => x.label == meal.category);
        menu.categories[newIndex].meals.push(meal);
      }
    }
    return menu;
  }

  /**
  * Add a new meal to the menu
  * @param meal The new meal to add
  */
  addMealToMenu(meal: Meal){
    if(this.menu.categories.some(c => c.label == meal.category)){
      const categoryIndex = this.getMenuCategoryId(meal.category);
      this.menu.categories[categoryIndex].meals.push(meal);
    }
  }

  /**
  * Remove a meal from the menu
  * @param meal The meal to remove from the menu
  */
  removeMealToMenu(meal: Meal){
    if(this.menu.categories.some(c => c.label == meal.category)){
      const categoryIndex = this.getMenuCategoryId(meal.category);
      if(categoryIndex >= 0){
        const mealIndex = this.menu.categories[categoryIndex].meals.findIndex(m => m == meal);
        if(mealIndex >= 0){
          this.menu.categories[categoryIndex].meals.splice(mealIndex, 1);
        }
        else{
          console.log("Could not remove meal : Meal doesn't exist.");
        }
      }
    }
  }

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
   * Return meals from a given category in the menu
   * @param category The given category to get meals of
   * @returns Returns meals in an array of Meal or undefined (if the category doesn't exist)
   */
  getMealsFromCategory(category: string): Array<Meal> | undefined{
    const index = this.menu.categories.findIndex(x => x.label == category);
    return index >= 0 ? this.menu.categories[index].meals : undefined;
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

  /**
  * Return the index of a given category
  * @param category The category to get the index of
  * @returns Returns the category index as a number
  */
  getCategoryId(category: string): number {
    const index = this.categories.findIndex(x => x == category);
    return index;
  }

  /**
  * Get category id in the current menu
  * @param category The category to get the index of
  * @returns Returns the category index as a number or null (of the category doesn't exist)
  */
  getMenuCategoryId(category: string): number {
    const index = this.menu.categories.findIndex(c => c.label == category);
    return index;
  }
}
