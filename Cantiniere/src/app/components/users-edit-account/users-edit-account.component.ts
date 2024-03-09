import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users-edit-account',
  templateUrl: './users-edit-account.component.html',
  styleUrls: ['./users-edit-account.component.scss'],
})
export class UsersEditAccountComponent implements OnInit {

  constructor(private modalController: ModalController,
    private alertController: AlertController) { }


  // close edit account pop up
  ngOnInit() { }
  closeEditAccountModal() {
    this.modalController.dismiss();
  }

  // save new information
  //open the delete account alert
  async presentSaveInfoDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous sauvegarder ces informations ?',
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
