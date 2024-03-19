import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './admin-meals-routing.module';
import { AdminMealsPage } from './admin-meals.page';
import { MenuModule } from 'src/app/components/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    MenuModule
  ],
  declarations: [AdminMealsPage]
})
export class AdminMealsPageModule {}
