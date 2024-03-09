import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRecapPage } from './admin-recap.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRecapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRecapPageRoutingModule { }
