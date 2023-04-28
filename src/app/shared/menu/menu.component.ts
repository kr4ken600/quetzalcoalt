import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ICategoria } from 'src/app/interfaces/categoria';
import { AuthService } from 'src/app/main/auth/service/auth.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ChequeoService } from 'src/app/utils/chequeo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  itemMenu!: MenuItem[];
  itemsSub!: MenuItem[];
  itemCuenta!: MenuModule[];

  categorias: ICategoria[] = [];

  consumibles: MenuItem[] = [];

  get username() {
    return this.checkSvc.token.length === 0 ? true : false;
  }

  constructor(
    private checkSvc: ChequeoService,
    private authSvc: AuthService,
    private catSvc: CategoriasService,
    private router: Router
  ) {
    this.catSvc.getcategorias().subscribe((res: ICategoria[]) => {
      this.categorias = res;
      let cat1 = this.categorias.filter(
        (val) => val.principal === 'consumibles'
      );
      cat1.forEach((val) => {
        this.consumibles.push({
          label: val.nombre,
          icon: 'pi pi-fw pi-tags',
          routerLink: ['/index/tienda', val.principal, val.nombre]
        })
      });
    });
  }

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
        label: 'Consumibles',
        icon: 'pi pi-fw pi-tags',
        items: this.consumibles,
      },
      {
        label: 'Refacciones',
        icon: 'pi pi-fw pi-tags',
      },
      {
        label: 'Cascos',
        icon: 'pi pi-fw pi-tags',
      },
      {
        label: 'Accesirios',
        icon: 'pi pi-fw pi-tags',
      },
      {
        label: 'Llantas',
        icon: 'pi pi-fw pi-tags',
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
    ];
  }
}
