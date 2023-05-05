import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem!: MenuItem;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      { label: 'Agregar Productos', icon: 'pi pi-fw pi-plus' },
      { label: 'Editar Productos', icon: 'pi pi-fw pi-pencil' },
      { label: 'Mostrar Inventario', icon: 'pi pi-fw pi-file' },
      { label: 'Mostrar Pedidos', icon: 'pi pi-fw pi-box' },
    ];

    this.activeItem = this.items[0];
  }

  dirigir(event: any) {
    const ruta = (event.label as String).toLocaleLowerCase().replace(' ', '-');
    
    this.router.navigateByUrl(`/dashboard/admin/${ruta}`);
  }
}
