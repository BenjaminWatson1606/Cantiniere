import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRecapPageRoutingModule } from './admin-recap-routing.module';

import { AdminRecapPage } from './admin-recap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRecapPageRoutingModule,
    IonicModule,

  ],
  declarations: [AdminRecapPage]
})
export class AdminRecapPageModule { }
