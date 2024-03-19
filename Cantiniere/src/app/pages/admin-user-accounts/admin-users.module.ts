import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminUsersPageRoutingModule } from './admin-users-routing.module';
import { AdminUsersPage } from './admin-users.page';
import { AdminUsersDetailsComponent } from 'src/app/components/admin-users-details/admin-users-details.component';
import { MenuModule } from 'src/app/components/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersPageRoutingModule,
    MenuModule
  ],
  declarations: [AdminUsersPage, AdminUsersDetailsComponent]
})
export class AdminUsersPageModule { }
