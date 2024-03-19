import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Observable } from 'rxjs';

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
          this.presentSuccessToast('Connexion réussi');
          this.getUserRole().subscribe(role => {
            if (role === 'ROLE_LUNCHLADY') {
              
              this.router.navigateByUrl("/admin-menus");
            }else{
              this.router.navigateByUrl("/menu");
            }
          });
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

  getUserRole(): Observable<string | null> {
    return this.authService.getUserRole();
  }
  
  @Output() registerClicked = new EventEmitter<{ role: string }>();

  onRegisterClick() {
    console.log('Register button clicked');
    this.modalController.dismiss({ role: 'register' });
  }

  
}
