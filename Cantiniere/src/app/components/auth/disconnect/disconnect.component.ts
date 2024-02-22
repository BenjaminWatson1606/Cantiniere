import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.scss'],
})
export class DisconnectComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private authService: AuthenticationService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  async handleDisconnect() {
    localStorage.removeItem('token');
    this.authService.setAuthenticated(false);
    await this.presentToast();
    await this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vous êtes déconnecté',
      duration: 2000, 
      position: 'bottom',
      color: 'success', 
    });
    toast.present();
  }
}
