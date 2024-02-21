import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'custom-modal-background',
    });
    return await modal.present();
  }

  async openMenuCard() {
    const modal = await this.modalController.create({
      component: MenuCardComponent,
      cssClass: 'custom-modal-background',
    });
    return await modal.present();
  }
}
