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
    path: 'admin-menu',
    loadChildren: () => import('./pages/admin-menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'admin-order-recap',
    loadChildren: () => import('./pages/admin-order-recap/admin-recap.module').then(m => m.AdminRecapPageModule)
  },
  {
    path: 'admin-user-accounts',
    loadChildren: () => import('./pages/admin-user-accounts/admin-users.module').then(m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-configuration',
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
