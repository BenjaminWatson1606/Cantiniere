import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-order',
  templateUrl: './pop-up-order.component.html',
  styleUrls: ['./pop-up-order.component.scss'],
})
export class PopUpOrderComponent implements OnInit {


  constructor(private modalController: ModalController) { }

  closeOrderModal() {
    this.modalController.dismiss();
  }

  ngOnInit() { }

  quantity: number = 0;

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

}
