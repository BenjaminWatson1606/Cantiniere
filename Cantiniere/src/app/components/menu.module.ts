import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuItemComponent } from './menu-item/menu-item.component';
import { EditableMenuItemComponent } from './editable-menu-item/editable-menu-item.component';
import { OrderCardComponent } from './order-card/order-card.component';

@NgModule({
  declarations: [
    MenuItemComponent,
    EditableMenuItemComponent,
    OrderCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuItemComponent,
    EditableMenuItemComponent,
    OrderCardComponent,
  ]
})
export class MenuModule { }
