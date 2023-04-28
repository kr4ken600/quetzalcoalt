import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICarrito } from 'src/app/interfaces/carrito';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [MessageService],
})
export class CarritoComponent implements OnInit, OnDestroy {
  articulos: ICarrito[] = [];

  subtotal: number = 0;

  suscriptC!: Subscription;
  idcarrito!: number;

  constructor(
    private carritoSvc: CarritoService,
    private mtv: MetodosVariosService,
    private msgSvc: MessageService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.suscriptC.unsubscribe();
  }
  ngOnInit(): void {
    this.carritoSvc.getCarrito().subscribe((res: ICarrito[]) => {
      this.articulos = res;

      this.articulos.forEach((art) => {
        let n = art.articulo.precio * art.cantidad;

        this.subtotal += n;
        console.log(this.subtotal);
        
      });
    });

    this.suscriptC = this.carritoSvc._refreshC$.subscribe(() => {
      this.carritoSvc.getCarrito().subscribe((res: ICarrito[]) => {
        this.articulos = res;
      });
    });
  }

  realizar() {
    this.mtv.redirectQuery(this.router, '/dashboard/compra', {
      list: true,
    });
  }

  eliminar(id: string) {
    this.carritoSvc.deleteCarrito(id).subscribe((res) => {
      this.mtv.showMsg(
        this.msgSvc,
        'warn',
        'Carrito',
        'Articulo retirado de la lista.'
      );
    });
  }

  test() {
    console.log('Llegamos aqui');
  }
}
