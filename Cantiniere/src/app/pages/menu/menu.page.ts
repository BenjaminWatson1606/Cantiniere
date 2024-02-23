import { Component, OnInit, createNgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Meal } from 'src/app/interfaces/meal-model';
import { MealService } from 'src/app/services/meal/meal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  meals: Meal[] = [];
  categories!: string[];
  
  selectedCategory!: string;
  selectedMeals: Meal[] | undefined;  
  newMeal: Meal = {} as Meal;

  constructor(
    private mealService: MealService,
    private alertController: AlertController
  ){}
  
  ngOnInit() {
    this.categories = this.mealService.getMealCategories();
    this.mealService.getWeeklyMeals().subscribe((data) => {
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
  }

  /**
   * Indicates if the selected category contains any meal or not
   * @returns Returns if the selected category has atleast one meal
   */
  categoryHasMeals(): boolean{
    return this.selectedMeals != undefined && this.selectedMeals.length > 0;
  }
  
  /**
   * Start editing a given meal
   * @param meal The meal to edit
   */
  editMeal(meal: Meal){
    meal.edited = true;
  }

  /**
   * End meal editing and update meal informations to the database
   * @param meal The updated meal object
   */
  updateMeal(meal: Meal){
    this.mealService.updateMeal(meal)?.subscribe();
    console.table(this.meals[0].label);
    meal.edited = false;
  }

  /**
   * Add a new meal to the database
   */
  submitMealForm(){
    this.newMeal.category = this.selectedCategory;
    this.mealService.addMeal(this.newMeal);
    this.newMeal = {} as Meal;
  }
  
  /**
   * Remove a meal from the database
   * @param meal The meal object to remove
   */
  removeMeal(meal: Meal){
    this.mealService.removeMeal(meal);
  }

  /**
   * Create an alert asking the confirmation to delete a meal from the menu
   * @param meal The meal object to delete
   */
  async showAlert(meal: Meal) {
    const alert = await this.alertController.create({
      header: `Supprimer ${meal.label}`,
      message: `Êtes-vous sûr de supprimer ${meal.label} ?`,
      buttons: 
      [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.removeMeal(meal);
          },
        },
      ]
    });

    await alert.present();
  }
}
