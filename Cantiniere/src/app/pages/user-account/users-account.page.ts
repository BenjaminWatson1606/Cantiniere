import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PopUpOrderComponent } from 'src/app/components/pop-up-order/pop-up-order.component';
import { PopUpCartComponent } from 'src/app/components/pop-up-cart/pop-up-cart.component';
import { UsersEditAccountComponent } from 'src/app/components/users-edit-account/users-edit-account.component';

import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-account',
  templateUrl: './users-account.page.html',
  styleUrls: ['./users-account.page.scss'],
})
export class UsersAccountPage implements OnInit {

  user!: User;
  orders!: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    //get user informations from services
    this.usersService.getUserInformations()?.subscribe(
      res => this.user = res,
      error => console.error(error),
    );

    //Get user orders
    this.usersService.getUserOrders()?.subscribe(
      res => {
        this.orders = res as [];
        const debug = this.orders.length <= 0 ? "No orders found" : `${this.orders.length} orders found`;
        console.log(debug);
      },
      error => console.error(error),
    )
  }

  // Open the order pop up
  async openOrderModal() {
    const modal = await this.modalController.create({
      component: PopUpOrderComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  // Open the cart pop up
  async openCartModal() {
    const modal = await this.modalController.create({
      component: PopUpCartComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  //open the edit account pop up
  async openEditAccountModal() {
    const modal = await this.modalController.create({
      component: UsersEditAccountComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  //open the delete account alert
  async presentDeleteAccountDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Confirmed');
          }
        }
      ]
    });
    await alert.present();
  }
}
