import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component'; 
import { PopUpOrderComponent } from 'src/app/components/pop-up-order/pop-up-order.component';
import { PopUpCartComponent } from 'src/app/components/pop-up-cart/pop-up-cart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule],
  declarations: [FolderPage, LoginComponent, RegisterComponent, PopUpOrderComponent, PopUpCartComponent], 
})
export class FolderPageModule {}
