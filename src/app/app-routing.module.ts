import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ],
  }, 
  {
    path: '**',
    redirectTo: 'index'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
