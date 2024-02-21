import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
import { Menu } from 'src/app/interfaces/menu-model';
import { MealService } from 'src/app/services/menu/meal-service.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent  implements OnInit {

  menu!: Menu;

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.menu = this.getMenu(this.mealService.getMeals());
  }
  
  /**
   * Return an array from a given meal array.
   * @param meals Meal array that contains the different meals of the menu
   * @returns A menu containing meals and their categories
   */
  getMenu(meals: Array<Meal>)
  {
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
}
