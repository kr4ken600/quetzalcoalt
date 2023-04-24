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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTarjetaComponent } from './components/form-tarjeta/form-tarjeta.component';
import { NumTarjetaPipe } from './pipes/num-tarjeta.pipe';
import { VentanaCompraComponent } from './ventana-compra/ventana-compra.component';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserContentComponent,
    CarritoComponent,
    ComprasComponent,
    ConfiguracionComponent,
    ModalDireccionComponent,
    FormTarjetaComponent,
    NumTarjetaPipe,
    VentanaCompraComponent,
    ListaArticulosComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ModalDireccionComponent]
})
export class UserModule { }
