import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

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
    private toastController: ToastController,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Connexion...',
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
          this.redirectUser();
          this.presentSuccessToast('Connexion réussi');
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

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
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
  
  @Output() registerClicked = new EventEmitter<{ role: string }>();

  onRegisterClick() {
    console.log('Register button clicked');
    this.modalController.dismiss({ role: 'register' });
  }

  /**
   * Redirect user to the corresponding user main page
   * Admin main page is 'admin' page / Default main page is 'menu'
   */
  redirectUser(){
    let redirection = this.authService.getLocalUserRole() == 'ROLE_LUNCHLADY' ? 'admin' : '/';
    this.router.navigateByUrl(redirection);
  }
}
