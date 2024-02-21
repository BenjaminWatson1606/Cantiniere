import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
import { Menu } from 'src/app/interfaces/menu-model';
import { MealService } from 'src/app/services/menu/meal-service.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  categories!: string[];
  menu!: Menu;

  selectedCategory!: string;
  selectedMeals: Array<Meal> | undefined;

  newMeal: Meal = {label: "", price: null, category: ''};

  constructor(
    private mealService: MealService,
    private menuService: MenuService
    ) { }

  ngOnInit() {
    this.categories = this.mealService.categories;
    this.menu = this.menuService.getMenu(this.mealService.getMeals());
    this.selectCategory(this.categories[3]);
  }
  
    /**
   * Get the display name of the given category using the meal service method
   * @param category The category to get the name of 
   * @returns Returns the name of the category as a string or undefined (if the category doesn't exist in the array)
   */
  getCategoryName(category: string): string|undefined {
    return this.mealService.getCategoryName(category);
  }

  /**
   * Update the value of the selected category and get its meals from the menu
   * @param category Value of the new selected category
   */
  selectCategory(category: string){
    if(this.selectedCategory == category)
      return;

    this.selectedCategory = category;
    this.selectedMeals = this.getMealsFromCategory(category);
  }

  /**
   * Get meals for a given category in the menu
   * @param category The category to get meals from
   * @returns Returns an array of Meals or undefined (if the category doesn't exist)
   */
  getMealsFromCategory(category: string): Array<Meal> | undefined{
    const index = this.menu.categories.findIndex(x => x.label == category);
    return index >= 0 ? this.menu.categories[index].meals : undefined;
  }

  /**
   * Return the current state of the selectedMeals array
   * @returns False => undefined or length <= 0 / True => else
   */
  isMealsEmpty(): boolean{
    if(!this.selectedMeals || this.selectedMeals.length <= 0)
      return false;
    else
      return true
  }

  /**
   * Start editing a meal
   * @param meal The meal that will be edited
   */
  editMeal(meal: Meal){
    meal.edited = true;
  }

  /**
   * Stop meal editing and push the modifications
   * @param meal The meal that was edited
   */
  submitMeal(meal: Meal){
    meal.edited = false;
  }

  /**
   * Method to remove a meal from the menu
   * @param meal The meal that will be removed
   */
  removeMeal(meal: Meal){
    const index = this.menu.categories.findIndex(x => x.label == meal.category)
    if(index >= 0){
      const mealIndex = this.menu.categories[index].meals.findIndex(m => m == meal);
      if(mealIndex >= 0){
        this.menu.categories[index].meals.splice(mealIndex, 1);
      }
    }
  }

  /**
   * Add a new meal in the menu
   */
  submitMealForm(){
    this.newMeal.category = this.selectedCategory;
    const index = this.menu.categories.findIndex(x => x.label == this.newMeal.category)
    if(index >= 0){
      this.menu.categories[index].meals.push(this.newMeal);
    }

    this.newMeal = {label: "", price: null, category: ''};
  }
}
