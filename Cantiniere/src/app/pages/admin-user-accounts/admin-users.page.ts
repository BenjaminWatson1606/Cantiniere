import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminUsersDetailsComponent } from 'src/app/components/admin-users-details/admin-users-details.component';

import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  users: User[] = [];
  searchResult: User[] = [];
  searchTerm!: string;

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    //Get users from database
    this.usersService.getAllUsers()?.subscribe(
      res => this.users = res,
      error => console.error(error)
    );
  }

  // Open the user details pop up
  async openUserDetailsModal() {
    const modal = await this.modalController.create({
      component: AdminUsersDetailsComponent, componentProps: {},
    });
    return await modal.present();
  }

  /**
   * Get the user list to display on template
   * @returns Returns an array of users
   */
  getTemplateList(): User[]{
    return this.searchResult.length > 0 ? this.searchResult : this.users;
  }

  /**
   * Apply search bar filter and get an array of user as result
   */
  applyFilter(){
    this.searchResult = this.users.filter(u => u.name === this.searchTerm || u.firstname === this.searchTerm);
  }
}