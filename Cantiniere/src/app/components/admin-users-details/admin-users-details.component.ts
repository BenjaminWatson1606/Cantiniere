import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { User } from 'src/app/interfaces/user';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-users-details',
  templateUrl: './admin-users-details.component.html',
  styleUrls: ['./admin-users-details.component.scss'],
})
export class AdminUsersDetailsComponent implements OnInit {
  @Input() user!: User;
  orders: Order[] = [];

  showCreditInputField = false;
  showDebitInputField = false;

  creditAmount: number | undefined;
  debitAmount: number | undefined;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private ordersService: OrdersService,
    private usersService: UsersService 
  ) {}

  ngOnInit() {
    this.ordersService.getOrdersByUserId(this.user.id)?.subscribe(
      (res) => (this.orders = res),
      (error) => console.error(error)
    );
  }

  toggleCreditInputField() {
    this.showCreditInputField = !this.showCreditInputField;
  }

  toggleDebitInputField() {
    this.showDebitInputField = !this.showDebitInputField;
  }

  async presentCreditDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir créditer cette somme ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            if (this.creditAmount) {
              this.creditUser(this.creditAmount);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentDebitDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir débiter cette somme ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            if (this.debitAmount) {
              this.debitUser(this.debitAmount);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  closeUsersDetailsModal() {
    this.modalController.dismiss();
  }

  // Credit the user with the specified amount
  creditUser(amount: number) {
    this.usersService.creditUser(this.user.id, amount)?.subscribe(
      (updatedUser) => {
        this.user.wallet = updatedUser.wallet; // Update user.wallet with the new value
      },
      (error) => {
        console.error('Failed to credit user:', error);
        // Optionally, you can show an error message
      }
    );
  }

  // Debit the user with the specified amount
  debitUser(amount: number) {
    this.usersService.debitUser(this.user.id, amount)?.subscribe(
      (updatedUser) => {
        this.user.wallet = updatedUser.wallet; // Update user.wallet with the new value
      },
      (error) => {
        console.error('Failed to debit user:', error);
        // Optionally, you can show an error message
      }
    );
  }
}
