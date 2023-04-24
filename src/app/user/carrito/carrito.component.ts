import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { UserService } from '../services/user.service';
import { ICarrito } from 'src/app/interfaces/carrito';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';
import { Router } from '@angular/router';

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
    private userSvc: UserService,
    private mtv: MetodosVariosService,
    private msgSvc: MessageService,
    private router: Router
  ) {
    this.userSvc.getCarrito().subscribe((res: ICarrito[]) => {
      this.articulos = res;

      this.articulos.forEach((art) => {
        let n = art.articulo.precio * art.cantidad;

        this.subtotal += n;
      });
    });
  }

  ngOnDestroy(): void {
    this.suscriptC.unsubscribe();
  }
  ngOnInit(): void {
    this.suscriptC = this.userSvc._refreshC$.subscribe(() => {
      this.userSvc.getCarrito().subscribe((res: ICarrito[]) => {
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
    this.userSvc.deleteCarrito(id).subscribe((res) => {
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
