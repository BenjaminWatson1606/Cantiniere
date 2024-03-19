import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMenusPageRoutingModule } from './admin-menus-routing.module';

import { AdminMenusPage } from './admin-menus.page';
import { MenuModule } from 'src/app/components/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenusPageRoutingModule,
    MenuModule,
  ],
  declarations: [AdminMenusPage]
})
export class AdminMenusPageModule {}
