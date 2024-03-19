import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuItemComponent } from './menu-item/menu-item.component';
import { EditableMenuItemComponent } from './editable-menu-item/editable-menu-item.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MealCategoriesComponent } from './meal-tabs/meal-tabs.component';

@NgModule({
  declarations: [
    MenuCardComponent,
    MenuItemComponent,
    EditableMenuItemComponent,
    OrderCardComponent,
    MealCategoriesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuCardComponent,
    MenuItemComponent,
    EditableMenuItemComponent,
    OrderCardComponent,
    MealCategoriesComponent,
  ]
})
export class MenuModule { }
