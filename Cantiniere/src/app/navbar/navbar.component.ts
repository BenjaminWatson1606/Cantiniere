import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { AuthenticationService } from '../services/auth/authentication.service';
import { DisconnectComponent } from '../components/auth/disconnect/disconnect.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PopUpCartComponent } from '../components/pop-up-cart/pop-up-cart.component';
import { Configuration } from '../interfaces/configuration';
import { ConfigurationService } from '../services/admin-configuration/configuration.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  configuration$!: Observable<Configuration>;

  constructor(
    private modalController: ModalController,
    private authService: AuthenticationService,
    private configService: ConfigurationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.configuration$ = this.configService.getConfigurationById(1);
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

  /**
   * Async operation to open cart pop up
   */
  async openCartModal() {
    const modal = await this.modalController.create({
      component: PopUpCartComponent,
    });
    return await modal.present();
  }

  logout() {
    this.authService.setAuthenticated(false);
  }

  getFirstName(): Observable<string | null> {
    return this.authService.getFirstName();
  }

  getUserRole(): Observable<string | null> {
    return this.authService.getUserRole();
  }

  /**
   * Indicated if the user has the given role
   * @returns Returns true if the user has the given role, else returns false
   */
  UserHasRole(role: string): boolean {
    return this.authService.getLocalUserRole() == role;
  }

  //#region App Routing
  /**
   * Load a new page using the router
   * @param url Router page's url
   */
  loadPage(url: string) {
    this.router.navigateByUrl(`/${url}`);
  }

  /**
   * Load main page based on the user role
   * Load 'menu' page for default users and load 'admin' page for admins
   */
  loadMainPage() {
    let url =
      !this.isAuthenticated || !this.UserHasRole('ROLE_LUNCHLADY')
        ? 'menu'
        : 'admin-menus';
    this.router.navigateByUrl(url);
  }

  /**
   * Load card menu page based on the user role
   * Open menu pop up for default users and load 'admin-menu' page for admins
   */
  loadMealsPage() {
    if (!this.isAuthenticated || !this.UserHasRole('ROLE_LUNCHLADY')) {
      this.openMenuCard();
    } else {
      this.router.navigateByUrl('admin-meals');
    }
  }
  //#endregion
}
