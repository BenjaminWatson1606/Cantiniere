import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu-model';
import { MealService } from 'src/app/services/menu/meal-service.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent  implements OnInit {

  menu!: Menu;

  constructor(
    private mealService: MealService,
    private menuService: MenuService
    ) {}

  ngOnInit() {
    this.menu = this.menuService.getMenu(this.mealService.getMeals());
  }
  
  /**
   * Get the display name of the given category using the meal service method
   * @param category The category to get the name of 
   * @returns Returns the name of the category as a string or undefined (if the category doesn't exist in the array)
   */
  getCategoryName(category: string): string|undefined {
    return this.mealService.getCategoryName(category);
  }
}
