import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { AuthenticationService } from '../services/auth/authentication.service';
import { DisconnectComponent } from '../components/auth/disconnect/disconnect.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps: {},
      cssClass: 'custom-modal-content',
      backdropDismiss: true,
      mode: 'ios',
      presentingElement: await this.modalController.getTop(),
    });

    modal.onDidDismiss().then((result) => {
      console.log('Modal dismissed with result:', result);
      if (result.data?.role === 'register') {
        this.openRegisterModal();
      }
    });

    return await modal.present();
  }

  async openRegisterModal() {
    const registerModal = await this.modalController.create({
      component: RegisterComponent,
      cssClass: 'custom-modal-content',
      backdropDismiss: true,
      mode: 'ios',
      presentingElement: await this.modalController.getTop(),
    });

    await registerModal.present();
  }

  async openMenuCard() {
    const modal = await this.modalController.create({
      component: MenuCardComponent,
      cssClass: 'custom-modal-background',
    });
    return await modal.present();
  }

  async openDiscModal() {
    const modal = await this.modalController.create({
      component: DisconnectComponent,
    });
    return await modal.present();
  }

  logout() {
    this.authService.setAuthenticated(false);
  }
}
