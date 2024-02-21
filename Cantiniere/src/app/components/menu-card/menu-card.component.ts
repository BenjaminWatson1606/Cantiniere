import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal-model';
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
  
}
