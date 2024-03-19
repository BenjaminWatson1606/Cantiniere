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
    this.mealService.getAllMeals().subscribe(
      (res) => this.meals = res,
    )
  }

  /**
   * Get the category and meals from it
   */
  getMealCategoryInfos(event: any){
    this.selectedMeals = event.meals;
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

  /**
   * Check if a given meal is included in the menu's meals array
   * @param meal 
   * @returns 
   */
  containsMeal(meal: Meal): boolean{
    return this.menuMeals.findIndex(m => m.label == meal.label) >= 0;
  }
}
