import { Component } from '@angular/core';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { UserService } from '../services/user.service';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ProductosService } from 'src/app/main/services/productos.service';
import { ICarrito } from 'src/app/interfaces/carrito';

@Component({
  selector: 'app-ventana-compra',
  templateUrl: './ventana-compra.component.html',
  styles: [],
})
export class VentanaCompraComponent {
  articulos: ICarrito[] = [];

  tarjetas!: ITarjeta[];
  direcciones!: IDireccion[];

  selectTarjeta!: ITarjeta;
  selectDireccion!: IDireccion;

  cantidad:number = 0;
  subtotal: number = 0;

  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute,
    private prdSvc: ProductosService
  ) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.producto) {
        this.cantidad = res.cnt;
        
        this.prdSvc
          .getProducto(res.producto)
          .subscribe((res) => {
            this.articulos.push({
              articulo: res,
              cantidad: this.cantidad,
            });

            this.subtotal = this.cantidad * res.precio;
          });
      } else {
        this.userSvc.getCarrito().subscribe((res) => {
          this.articulos = res
          this.articulos.forEach((art) => {
            let n = art.articulo.precio * art.cantidad;
    
            this.subtotal += n;
          });
        });
      }
    });

    this.userSvc.getTarjetas().subscribe((res) => {
      this.tarjetas = res as ITarjeta[];
    });

    this.userSvc.getDirecciones().subscribe((res) => {
      this.direcciones = res as IDireccion[];
    });
  }
}
