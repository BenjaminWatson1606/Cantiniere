import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/folder/folder.module').then(m => m.FolderPageModule),
  },
  {
    path: 'user-account',
    loadChildren: () => import('./pages/user-account/users-account.module').then(m => m.UsersAccountPageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
  },
  {
    path: 'admin-meals',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin-meals/admin-meals.module').then( m => m.AdminMealsPageModule)
  },
  {
    path: 'admin-menus',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin-menus/admin-menus.module').then( m => m.AdminMenusPageModule)
  },
  {
    path: 'admin-order-recap',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin-order-recap/admin-recap.module').then(m => m.AdminRecapPageModule)
  },
  {
    path: 'admin-user-accounts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin-user-accounts/admin-users.module').then(m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-configuration',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin-configuration/configuration.module').then( m => m.AdminConfigPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
