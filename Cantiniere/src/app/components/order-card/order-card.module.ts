import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { OrderCardComponent } from './order-card.component';

@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    OrderCardComponent
  ],
})
export class OrderCardModule { }
