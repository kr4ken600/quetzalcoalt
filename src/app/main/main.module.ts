import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescripcionPipe } from './pipes/descripcion.pipe';
import { ProductoComponent } from './productos/pages/producto/producto.component';
import { UnicoComponent } from './productos/pages/unico/unico.component';
import { FormsModule } from '@angular/forms';
import { MoreShopComponent } from './components/more-shop/more-shop.component';
import { ShadowShopComponent } from './components/shadow-shop/shadow-shop.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    NosotrosComponent,
    LoginComponent,
    RegisterComponent,
    DescripcionPipe,
    ProductoComponent,
    UnicoComponent,
    MoreShopComponent,
    ShadowShopComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule { }
