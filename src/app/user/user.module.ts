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
import { VentanaCompraComponent } from './ventana-compra/ventana-compra.component';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { PipesModule } from './pipes/pipes.module';
import { DetalleCompraComponent } from './detalle-compra/detalle-compra.component';
import { AgregarProductosComponent } from './admin/agregar-productos/agregar-productos.component';
import { DashboardAdminComponent } from './admin/dashboard/dashboard.component';
import { EditarProductosComponent } from './admin/editar-productos/editar-productos.component';
import { MostrarProductosComponent } from './admin/mostrar-productos/mostrar-productos.component';
import { MostrarPedidosComponent } from './admin/mostrar-pedidos/mostrar-pedidos.component';
import { ShowArticulosComponent } from './components/show-articulos/show-articulos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserContentComponent,
    CarritoComponent,
    ComprasComponent,
    ConfiguracionComponent,
    ModalDireccionComponent,
    FormTarjetaComponent,
    VentanaCompraComponent,
    ListaArticulosComponent,
    DetalleCompraComponent,
    DashboardAdminComponent,
    AgregarProductosComponent,
    EditarProductosComponent,
    MostrarProductosComponent,
    MostrarPedidosComponent,
    ShowArticulosComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  entryComponents: [ModalDireccionComponent]
})
export class UserModule { }
