import { Component } from '@angular/core';
import { IProducto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.css'],
})
export class MostrarProductosComponent {
  products: IProducto[] = [];

  constructor(private prodSvc: ProductosService) {
    this.prodSvc.getAllProdcuts().subscribe((res) => {
      this.products = res;
    });
  }
}
