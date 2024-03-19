import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMealsPage } from './admin-meals.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
