import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MealService } from 'src/app/services/meal/meal.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.page.html',
  styleUrls: ['./admin-menus.page.scss'],
})
export class AdminMenusPage implements OnInit {

  menus!: Menu[];
  
  isEditing = false;
  editedMenu: Menu | undefined;

  constructor(private menuService: MenuService, private mealService: MealService) { }

  ngOnInit() {
    this.getAllMenus();
  }

  getAllMenus(){
    this.menuService.getAllMenus()?.subscribe(
      res => this.menus = res,
      error => console.error(error),
    );
  }

  createNewMenu(){
    this.editedMenu = undefined;
    this.isEditing = true;
  }

  editMenu(menu: Menu){
    this.editedMenu = menu;
    this.isEditing = true;
  }

  addMenu(menu: Menu){
    this.cancelEditing();
    this.menuService.addMenu(menu)?.subscribe(
      res => this.getAllMenus(),
      error => console.error(error),
    );
  }

  updateMenu(menu: Menu){
    console.table(menu);
    this.cancelEditing();
    this.menuService.updateMenu(menu)?.subscribe(
      res => this.getAllMenus(),
      error => console.error(error),
    );
  }

  deleteMenu(menu: Menu){
    console.log("delete request");
    this.menuService.deleteMenu(menu.id)?.subscribe(
      res => {
        if(res) 
          this.getAllMenus();
      },
      error => console.error(error),
    );
  }

  cancelEditing(){
    this.editedMenu = undefined;
    this.isEditing = false;
  }
}
