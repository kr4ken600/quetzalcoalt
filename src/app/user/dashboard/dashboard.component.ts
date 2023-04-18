import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/main/auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username!: string;
  items!: MenuItem[];

  constructor(private authSvc: AuthService, private router: Router) {
    this.username = this.authSvc.usuario.username;

    this.items = [
      {
        label: 'Panel',
        icon: 'pi pi-fw pi-user',
        routerLink: '/dashboard/user',
      },
      {
        label: 'Mis Compras',
        icon: 'pi pi-fw pi-gift',
        routerLink: '/dashboard/compras',
      },
      {
        label: 'Carrito',
        icon: 'pi pi-fw pi-cart-plus',
        routerLink: '/dashboard/carrito',
      },
      {
        label: 'Configuración',
        icon: 'pi pi-fw pi-wrench',
        routerLink: '/dashboard/configuracion',
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar Sesion',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authSvc.logOut();
          this.router.navigateByUrl('/index/login');
        },
      },
    ]
  }

  logOut() {
    this.authSvc.logOut();

    this.router.navigateByUrl('/index/login');
  }
}
