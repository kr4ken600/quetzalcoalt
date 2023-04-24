import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserContentComponent } from './user-content/user-content.component';
import { ComprasComponent } from './compras/compras.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { VentanaCompraComponent } from './ventana-compra/ventana-compra.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'user',
        component: UserContentComponent
      },
      {
        path:'compras',
        component: ComprasComponent
      },
      {
        path:'carrito',
        component: CarritoComponent
      },
      {
        path:'configuracion',
        component: ConfiguracionComponent
      },
      {
        path:'compra',
        component: VentanaCompraComponent
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
