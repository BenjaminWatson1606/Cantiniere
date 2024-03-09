import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminUsersDetailsComponent } from 'src/app/components/admin-users-details/admin-users-details.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  // Open the user details pop up
  async openUserDetailsModal() {
    const modal = await this.modalController.create({
      component: AdminUsersDetailsComponent, componentProps: {},
    });
    return await modal.present();
  }



}
//TODO FAIRE LA FONCTION RECHERCHER UN UTILISATEUR