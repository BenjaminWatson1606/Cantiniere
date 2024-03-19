import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal';
import { MealService } from 'src/app/services/meal/meal.service';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './meal-tabs.component.html',
  styleUrls: ['./meal-tabs.component.scss'],
})
export class MealCategoriesComponent  implements OnInit {

  meals: Meal[] = [];
  categories!: string[];

  selectedCategory!: string;
  selectedMeals: Meal[] | undefined;

  @Output() onCategorySelected: EventEmitter<{ meals: Meal[] | undefined, category: string }> = new EventEmitter();

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.categories = this.mealService.getMealCategories();
    this.mealService.getAllMeals().subscribe((data) => {
      this.meals = data;
      this.selectMealCategory(this.categories[3]);
    })
  }

  /**
   * Get the template name of a category
   * @param category The category to get the template name of
   * @returns Returns the template name as a string. Example: MAIN_DISHES => Plats Principaux 
   */
  getTemplateName(category: string): string {
    return this.mealService.getTemplateName(category);
  }

  /**
   * Select a new category and get its meals
   * @param category The new selected category
   */
  selectMealCategory(category: string){
    if(this.selectedCategory == category)
      return;
    this.selectedCategory = category;
    this.selectedMeals = this.mealService.getMealOfCategory(this.meals, this.selectedCategory);
    this.onCategorySelected.emit(
      { 
        meals: this.selectedMeals,
        category: this.selectedCategory 
      }
    );
  }
  
  /**
   * Indicates if the selected category contains any meal or not
   * @returns Returns if the selected category has atleast one meal
   */
  categoryHasMeals(): boolean{
    return this.selectedMeals != undefined && this.selectedMeals.length > 0;
  }
}
