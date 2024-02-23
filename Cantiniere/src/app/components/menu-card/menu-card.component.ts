import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
import { MealService } from 'src/app/services/meal/meal.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent  implements OnInit {

  mealCategories: MealCategory[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.mealService.getDailyMeals().subscribe((data) => {
      this.getMealCategories(data);
    })
  }
  
  /**
   * Get the template name of a given meal category
   * @param category The meal category to get the template name of
   * @returns Return the template name of the meal category as a string
   */
  getTemplateName(category: string): string {
    return this.mealService.getTemplateName(category);
  }

  /**
   * Create an array with the available meal categories and their respective meals
   * @param meals Meals array to filter
   */
  getMealCategories(meals: Meal[]){
    if(!meals || meals.length <= 0)
      return;

    //else
    for(let meal of meals){
      const categoryIndex = this.mealCategories.findIndex(c => c.label == meal.category);
      //Category exists
      if(categoryIndex >= 0){
        this.mealCategories[categoryIndex].meals.push(meal);
      }
      //Category doesn't exist
      else{
        const newCategory = { label: meal.category, meals: []};
        this.mealCategories.push(newCategory);
        //Push the meal into the new meal category
        const length = this.mealCategories.length - 1;
        this.mealCategories[length].meals.push(meal);
      }
    }
  }

  /**
   * Indicates if the meal categories is defined and not empty 
   */
  hasMealCategories(): boolean{
    return this.mealCategories && this.mealCategories.length > 0;
  }
}

interface MealCategory{
  label: string,
  meals: Meal[]
}