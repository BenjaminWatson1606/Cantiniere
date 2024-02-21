import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
import { Menu } from 'src/app/interfaces/menu-model';
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

  newMeal: Meal = {label: "", price: null, category: '', categoryIndex: 0};

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menu = this.menuService.menu;
    this.categories = this.menuService.categories;
    this.selectCategory(this.categories[3]);
  }
  
    /**
   * Get the display name of the given category using the meal service method
   * @param category The category to get the name of 
   * @returns Returns the name of the category as a string or undefined (if the category doesn't exist in the array)
   */
  getCategoryName(category: string): string|undefined {
    return this.menuService.getCategoryName(category);
  }

  /**
   * Update the value of the selected category and get its meals from the menu
   * @param category Value of the new selected category
   */
  selectCategory(category: string){
    if(this.selectedCategory == category){
      return;
    }

    //Set selectedCategory and get its meals from the service
    this.selectedCategory = category;
    this.selectedMeals = this.menuService.getMealsFromCategory(category);
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
    this.menuService.removeMealToMenu(meal);
    this.menu = this.menuService.menu;
  }

  /**
   * Add a new meal in the menu
   */
  submitMealForm(){
    //Set new meal category and category index
    this.newMeal.category = this.selectedCategory;
    this.newMeal.categoryIndex = this.menuService.getCategoryId(this.newMeal.category);

    //Add the meal to the menu
    this.menuService.addMealToMenu(this.newMeal);
    this.newMeal = {label: "", price: null, category: '', categoryIndex: 0}
    this.menu = this.menuService.menu;
  }
}
