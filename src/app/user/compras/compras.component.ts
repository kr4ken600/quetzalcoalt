import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProductoRes } from 'src/app/interfaces/compras';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent {
  productos: IProductoRes[] = [];

  constructor(private compraSvc: ComprasService, private router: Router) {
    this.compraSvc.getCompras().subscribe((res) => {
      this.productos = res;
    });
  }

  detalle(id: string) {
    this.router.navigate(['/dashboard/detalle', id]);
  }

  redirect(id: string) {
    this.router.navigate(['/index/producto', id]);
  }
}
