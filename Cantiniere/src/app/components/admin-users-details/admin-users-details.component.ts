import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-users-details',
  templateUrl: './admin-users-details.component.html',
  styleUrls: ['./admin-users-details.component.scss'],
})
export class AdminUsersDetailsComponent implements OnInit {
  showInputField = false;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  // display input when crediter and solder button are clicked
  toggleInputField() {
    this.showInputField = !this.showInputField;
  }

  //ask the user to confirm the credit
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
            console.log('Confirmed');
          }
        }
      ]
    });
    await alert.present();
  }

  //ask the user to confirm the payment
  async presentPayDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir solder cette somme ?',
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

  closeUsersDetailsModal() {
    this.modalController.dismiss();
  }


}
