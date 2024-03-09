import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { RegisterService } from '../../../services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  name: string = '';
  firstname: string = '';
  email: string = '';
  password: string = '';

  sex: number = 0;
  manChecked: boolean = false;
  womanChecked: boolean = false;
  otherChecked: boolean = false;

  onSexChange(sexType: string) {
    this.manChecked = false;
    this.womanChecked = false;
    this.otherChecked = false;

    switch (sexType) {
      case 'man':
        this.sex = 0;
        this.manChecked = true;
        break;
      case 'woman':
        this.sex = 1;
        this.womanChecked = true;
        break;
      case 'other':
        this.sex = 2;
        this.otherChecked = true;
        break;
      default:
        this.sex = 0;
        break;
    }
  }

  constructor(
    private modalController: ModalController,
    private registerService: RegisterService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  async register() {
    const userData = {
      name: this.name,
      firstname: this.firstname,
      email: this.email,
      password: this.password,
      sex: this.sex,
    };

    const loading = await this.loadingController.create({
      message: 'Registration in progress...',
    });

    try {
      await loading.present();

      const response = await this.registerService.registerUser(userData);
      console.log('Registration successful', response);

      this.presentSuccessToast('Création de compte avec succés');
      await this.modalController.dismiss();
    } catch (error) {
      console.error('Error during registration', error);
      this.presentErrorToast('Echec. Veuillez réessayer.');
    } finally {
      await loading.dismiss();
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
}
