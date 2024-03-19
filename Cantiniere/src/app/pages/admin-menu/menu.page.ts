import { CSP_NONCE, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { delay } from 'rxjs';

import { Meal } from 'src/app/interfaces/meal';
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
  updateMeals!: ChangeDetectorRef;

  constructor(
    private mealService: MealService,
    private alertController: AlertController,
    private toastController: ToastController
  ){}
  
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
    meal.edited = false;
    this.mealService.updateMeal(meal)?.subscribe(
        res => this.createToast(res, 'update'),
        error => {
          this.reloadMeals();
          this.createErrorToast('update');
        },
      );
  }

  /**
   * Add a new meal to the database
   */
  submitMealForm(){
    this.newMeal.category = this.selectedCategory;
    this.mealService.addMeal(this.newMeal)?.subscribe(
      res => {
        this.reloadMeals();
        this.createToast(res, 'add');
      },
      error => this.createErrorToast('add'),
    );
    this.newMeal = {} as Meal;
  }
  
  /**
   * Remove a meal from the database
   * @param meal The meal object to remove
   */
  removeMeal(meal: Meal){
    this.mealService.removeMeal(meal)?.subscribe(
      res => {
        this.reloadMeals();
        this.createToast(res, 'remove')
      },
      error => {
        this.reloadMeals();
        this.createErrorToast('remove');
      },
    );
  }

  /**
   * Subscribe to the meal service getMeals observable and refresh meal array
   */
  reloadMeals(){
    this.mealService.getWeeklyMeals().subscribe(
      res => {
        this.meals = res;
        this.selectedMeals = this.mealService.getMealOfCategory(this.meals, this.selectedCategory);
      }
    );
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

  /**
   * Create a toast to confirm meal actions to the user 
   * @param meal The meal that has been operated
   * @param actionType The type of action that was done
   */
  async createToast(meal: Meal, actionType: 'update' |'add' | 'remove') {    
    const action = actionType == 'update' ? 'modifié' : actionType == 'add' ? 'ajouté' : 'supprimé';
    const message = `Le plat ${meal.label} a bien été ${action} !`;

    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: 'success',
    });

    await toast.present();
  }

    /**
   * Create a toast when an error happen during a meal backend operation 
   * @param meal The meal that has been operated
   * @param actionType The type of action that was done
   */
    async createErrorToast(actionType: 'update' |'add' | 'remove') {
      const action = actionType == 'update' ? 'la modification' : actionType == 'add' ? "l'ajout" : 'suppression';
      const message = `Une erreur est survenue lors de ${action} d'un plat.`;
      
      const toast = await this.toastController.create({
        message: message,
        duration: 2500,
        color: 'danger',
      });
  
      await toast.present();
    }
}
