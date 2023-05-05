import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './admin/dashboard/dashboard.component';
import { UserContentComponent } from './user-content/user-content.component';
import { ComprasComponent } from './compras/compras.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { VentanaCompraComponent } from './ventana-compra/ventana-compra.component';
import { DetalleCompraComponent } from './detalle-compra/detalle-compra.component';
import { ValidCompraGuard } from '../guards/valid-compra.guard';
import { AgregarProductosComponent } from './admin/agregar-productos/agregar-productos.component';
import { EditarProductosComponent } from './admin/editar-productos/editar-productos.component';
import { MostrarProductosComponent } from './admin/mostrar-productos/mostrar-productos.component';
import { MostrarPedidosComponent } from './admin/mostrar-pedidos/mostrar-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        component: UserContentComponent,
      },
      {
        path: 'compras',
        component: ComprasComponent,
      },
      {
        path: 'carrito',
        component: CarritoComponent,
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
      },
      {
        path: 'compra',
        component: VentanaCompraComponent,
        canActivate: [ValidCompraGuard],
        canLoad: [ValidCompraGuard],
      },
      {
        path: 'detalle/:id',
        component: DetalleCompraComponent,
      },
      {
        path: 'admin',
        component: DashboardAdminComponent,
        children: [
          {
            path: 'agregar-productos',
            component: AgregarProductosComponent,
          },
          {
            path: 'editar-productos',
            component: EditarProductosComponent,
          },
          {
            path: 'mostrar-inventario',
            component: MostrarProductosComponent,
          },
          {
            path: 'mostrar-pedidos',
            component: MostrarPedidosComponent,
          },
          {
            path: '**',
            redirectTo: 'agregar-productos',
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'user',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
