import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthService } from 'src/app/main/auth/service/auth.service';
import { ChequeoService } from 'src/app/utils/chequeo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  itemMenu!: MenuItem[];
  itemsSub!: MegaMenuItem[];
  itemCuenta!: MenuModule[];

  get username() {
    return this.checkSvc.token.length === 0 ? true : false;
  }

  constructor(
    private checkSvc: ChequeoService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemMenu = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
      },
      {
        label: 'Nosotros',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/index/nosotros',
      },
    ];

    this.itemsSub = [
      {
        label: 'Refacciones',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Cascos',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Accesirios',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Llantas',
        icon: 'pi pi-fw pi-file',
      },
    ];

    this.itemCuenta = [
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
}
