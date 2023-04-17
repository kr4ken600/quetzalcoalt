import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalComponent,
    NosotrosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
