import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  items!: MegaMenuItem[];

  constructor() {
    
  }
  ngOnInit(): void {
    this.items = [
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
