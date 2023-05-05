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
  role!: string;
  items!: MenuItem[];

  constructor(private authSvc: AuthService, private router: Router) {
    this.username = this.authSvc.usuario.username;
    this.role = this.authSvc.usuario.role;

    this.items = [
      {
        label: 'Panel',
        icon: 'pi pi-fw pi-user',
        routerLink: '/dashboard/user',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Mis Compras',
        icon: 'pi pi-fw pi-gift',
        routerLink: '/dashboard/compras',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Carrito',
        icon: 'pi pi-fw pi-cart-plus',
        routerLink: '/dashboard/carrito',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Configuración',
        icon: 'pi pi-fw pi-wrench',
        routerLink: '/dashboard/configuracion',
        routerLinkActiveOptions: { exact: true },
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
    ];

    if(this.authSvc.usuario.role === 'admin'){
      this.items.unshift({
        label: 'Funciones de Administrador',
        icon: 'pi pi-fw pi-lock',
        routerLink: '/dashboard/admin',
        routerLinkActiveOptions: { exact: true },
      })
    }
  }

  logOut() {
    this.authSvc.logOut();

    this.router.navigateByUrl('/index/login');
  }
}
