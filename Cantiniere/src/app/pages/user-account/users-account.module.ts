import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersAccountPageRoutingModule } from './users-account-routing.module';

import { UsersAccountPage } from './users-account.page';
import { UsersEditAccountComponent } from 'src/app/components/users-edit-account/users-edit-account.component';
import { OrderCardModule } from 'src/app/components/order-card/order-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersAccountPageRoutingModule,
    OrderCardModule
  ],
  declarations: [UsersAccountPage, UsersEditAccountComponent]
})
export class UsersAccountPageModule { }
