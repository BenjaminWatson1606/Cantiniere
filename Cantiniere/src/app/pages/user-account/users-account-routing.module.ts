import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersAccountPage } from './users-account.page';

const routes: Routes = [
  {
    path: '',
    component: UsersAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersAccountPageRoutingModule {}
