import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  itemMenu!: MenuItem[];
  itemsSub!: MegaMenuItem[];

  constructor() {
    
  }
  ngOnInit(): void {

    this.itemMenu = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Nosotros',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/index/nosotros'
      }
    ]

    this.itemsSub = [
      {
        label: 'Refacciones',
        icon: 'pi pi-fw pi-file'
      },
      {
        label: 'Cascos',
        icon: 'pi pi-fw pi-file'
      },
      {
        label: 'Accesirios',
        icon: 'pi pi-fw pi-file'
      },
      {
        label: 'Llantas',
        icon: 'pi pi-fw pi-file'
      },
    ]
  }

}
