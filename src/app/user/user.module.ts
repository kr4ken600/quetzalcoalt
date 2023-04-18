import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { UserContentComponent } from './user-content/user-content.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ComprasComponent } from './compras/compras.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ModalDireccionComponent } from './components/modal-direccion/modal-direccion.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UserContentComponent,
    CarritoComponent,
    ComprasComponent,
    ConfiguracionComponent,
    ModalDireccionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalDireccionComponent]
})
export class UserModule { }
