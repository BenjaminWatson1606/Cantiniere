import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private modalController: ModalController,
    private loginService: LoginService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });

    try {
      await loading.present();

      console.log(
        'Attempting login with credentials:',
        this.email,
        this.password
      );

      this.loginService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login response:', response);
        },
        (error) => {
          console.error('Login error:', error);
          this.presentErrorToast(
            'Login failed. Please check your credentials.'
          );
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      await loading.dismiss();
      await this.modalController.dismiss();
    }
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
