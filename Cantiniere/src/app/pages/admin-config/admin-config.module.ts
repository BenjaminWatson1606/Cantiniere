import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminConfigPageRoutingModule } from './admin-config-routing.module';

import { AdminConfigPage } from './admin-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminConfigPageRoutingModule
  ],
  declarations: [AdminConfigPage]
})
export class AdminConfigPageModule {}
