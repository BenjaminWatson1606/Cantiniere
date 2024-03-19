import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from 'src/app/interfaces/meal';
import { Menu } from 'src/app/interfaces/menu';
import { MealService } from 'src/app/services/meal/meal.service';

@Component({
  selector: 'app-editable-menu-item',
  templateUrl: './editable-menu-item.component.html',
  styleUrls: ['./editable-menu-item.component.scss'],
})
export class EditableMenuItemComponent  implements OnInit {

  @Input() menu: Menu | undefined;

  meals: Meal[] = [];
  categories!: string[];
  
  selectedCategory!: string;
  selectedMeals: Meal[] | undefined;

  //Form properties
  menuForm = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.required]),
  });
  menuMeals: Meal[] = [];

  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<Menu> = new EventEmitter();

  constructor(private mealService: MealService){}
  
  ngOnInit() {
    //Initialize values if a menu is shared
    if(this.menu){
      this.menuForm.controls.label.setValue(this.menu.label);
      this.menuForm.controls.price.setValue(this.menu.priceDF.toString());
      this.menuMeals = this.menu.meals;
    }

    //Get meals and meal categories
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
   * Emit the edit event if a menu was in edit or create event to send the new created menu
   */
  submitMenu(){
    //Edit menu
    if(this.menu){
      if(this.menuForm.controls.label.value && this.menuForm.controls.price.value){
        this.menu.label = this.menuForm.controls.label.value;
        this.menu.priceDF = parseInt(this.menuForm.controls.price.value);
        this.menu.meals = this.menuMeals;
        this.onEdit.emit(this.menu);
      }
    }
    //Create new menu
    else{
      this.onCreate.emit({
          label: this.menuForm.controls.label.value,
          status: 'ENABLED',
          priceDF: this.menuForm.controls.price.value,
          meals: this.menuMeals,
        }
      );
    }
  }
  
  /**
   * Add a given meal to the menu's meals array
   */
  addMealToMenu(meal: Meal){
    this.menuMeals.push(meal);
  }

  /**
   * Remove a meal from menu's meals array by passing an id
   */
  removeMealFromMenu(id: number){
    if(id <= -1 || id >= this.menuMeals.length)
      return;
    //else
    this.menuMeals.splice(id, 1);
  }

  containsMeal(meal: Meal): boolean{
    return this.menuMeals.findIndex(m => m.label == meal.label) >= 0;
  }
}
