import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-cart',
  templateUrl: './pop-up-cart.component.html',
  styleUrls: ['./pop-up-cart.component.scss'],
})
export class PopUpCartComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  ngOnInit() { }

  //close cart pop up
  closeCartModal() {
    this.modalController.dismiss();
  }

  //TODO remove an object from the cart

  //TODO validate the order from the cart
  async validateOrder() {
    // error message if the "cagnotte" is empty
    const toast = await this.toastController.create({
      message: 'Cagnotte insuffisante',
      duration: 900,
      position: 'middle'
    });
    toast.present();
  }



}
