import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminUsersPageRoutingModule } from './admin-users-routing.module';
import { AdminUsersPage } from './admin-users.page';
import { AdminUsersDetailsComponent } from 'src/app/components/admin-users-details/admin-users-details.component';
import { OrderCardComponent } from 'src/app/components/order-card/order-card.component';
import { OrderCardModule } from 'src/app/components/order-card/order-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersPageRoutingModule,
    OrderCardModule
  ],
  declarations: [AdminUsersPage, AdminUsersDetailsComponent]
})
export class AdminUsersPageModule { }
