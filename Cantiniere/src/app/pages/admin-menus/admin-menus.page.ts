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
    //Get all menus
    this.getAllMenus();
  }

  /**
   * Get all menus using the menu service
   */
  getAllMenus(){
    this.menuService.getAllMenus()?.subscribe(
      res => this.menus = res,
      error => console.error(error),
    );
  }

  //#region Editing Methods
  /**
   * Initialize editing variables to create a new menu
   */
  createNewMenu(){
    this.editedMenu = undefined;
    this.isEditing = true;
  }

  /**
   * Set editing variables to update an existing menu
   * @param menu Updated menu object
   */
  editMenu(menu: Menu){
    this.editedMenu = menu;
    this.isEditing = true;
  }

  /**
   * Reset editing variables
   */
  cancelEditing(){
    this.editedMenu = undefined;
    this.isEditing = false;
  }
  //#endregion

  //#region DataSharing methods
  /**
   * Add a new menu using the menu service
   * @param menu The menu to add into the database
   */
  addMenu(menu: Menu){
    this.cancelEditing();
    this.menuService.addMenu(menu)?.subscribe(
      res => this.getAllMenus(),
      error => console.error(error),
    );
  }

  /**
   * Update an existing menu using the menu service
   * @param menu Updated menu informations
   */
  updateMenu(menu: Menu){
    console.table(menu);
    this.cancelEditing();
    this.menuService.updateMenu(menu)?.subscribe(
      res => this.getAllMenus(),
      error => console.error(error),
    );
  }

  /**
   * Disabled an existing menu using the menu service
   * @param menu The menu to disable
   */
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
  //#endregion
}
