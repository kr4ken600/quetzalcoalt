import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserActiveGuard } from '../guards/user-active.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PrincipalComponent,
      },
      {
        path: 'nosotros',
        component: NosotrosComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UserActiveGuard],
        canLoad: [UserActiveGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UserActiveGuard],
        canLoad: [UserActiveGuard]
      },
      {
        path: '**',
        redirectTo: 'principal'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
