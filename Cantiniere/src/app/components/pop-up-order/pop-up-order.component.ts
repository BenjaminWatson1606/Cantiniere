import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-order',
  templateUrl: './pop-up-order.component.html',
  styleUrls: ['./pop-up-order.component.scss'],
})
export class PopUpOrderComponent implements OnInit {
  @Input() day: string | undefined;

  constructor(private modalController: ModalController) {}

  closeOrderModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    const currentWeek = this.getCurrentWeek();
    console.log('Current week of the year:', currentWeek);

    const dayNumber = this.getCurrentDayNumber();
    console.log('Current day number:', dayNumber);
  }

  quantity: number = 0;

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  getCurrentWeek(): number {
    const now: Date = new Date();
    const onejan: Date = new Date(now.getFullYear(), 0, 1);
    const millisecsInDay: number = 86400000;
    const weekNum: number = Math.ceil(
      ((now.getTime() - onejan.getTime()) / millisecsInDay +
        onejan.getDay() +
        1) /
        7
    );
    return weekNum;
  }
  getCurrentDayNumber(): number | undefined {
    if (!this.day) return undefined;
    const daysMap: { [key: string]: number } = {
      Lundi: 1,
      Mardi: 2,
      Mercredi: 3,
      Jeudi: 4,
      Vendredi: 5,
      Samedi: 6,
      Dimanche: 7,
    };
    return daysMap[this.day];
  }
}
