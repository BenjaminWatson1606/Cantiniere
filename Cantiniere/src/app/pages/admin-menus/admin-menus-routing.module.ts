import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMenusPage } from './admin-menus.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMenusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMenusPageRoutingModule {}
