import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/main/services/productos.service';
import { ChequeoService } from 'src/app/utils/chequeo.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { CarritoService } from 'src/app/services/carrito.service';
import { ICarritoReq } from 'src/app/interfaces/carrito';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';

@Component({
  selector: 'app-unico',
  templateUrl: './unico.component.html',
  styles: [],
  providers: [ConfirmationService, MessageService],
})
export class UnicoComponent implements OnInit {
  articulo!: IProducto;

  campo = 1;
  id!: string;
  stock: number = 0;

  get tocken() {
    return this.checkSvc.token.length > 0 ? true : false;
  }

  constructor(
    private prdSvc: ProductosService,
    private checkSvc: ChequeoService,
    private cfSvc: ConfirmationService,
    private mtv: MetodosVariosService,
    private msgSvc: MessageService,
    private carritoSvc: CarritoService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.params
      .pipe(switchMap(({ id }) => this.prdSvc.getProducto(id)))
      .subscribe((res) => {
        this.articulo = res;

        this.stock = this.articulo.stock;
        this.id = this.articulo._id!;
      });
  }

  setCnt(status: boolean) {
    if (status) {
      if (this.campo === this.stock) {
        return;
      }
      this.campo += 1;
    } else {
      if (this.campo === 0) {
        return;
      }
      this.campo -= 1;
    }
  }

  agregar() {
    if (!this.tocken) {
      this.showMessage();
      return;
    }

    const carrito: ICarritoReq = {
      articulo: this.id,
      cantidad: this.campo,
    };

    this.carritoSvc.addCarrito(carrito).subscribe((res) => console.log(res));

    this.mtv.showMsg(this.msgSvc,'success', 'Carrito', 'articulo agregado a tu carrito');
  }

  comprar() {
    if (!this.tocken) {
      this.showMessage();
      return;
    }
    this.mtv.redirectQuery(this.router, '/dashboard/compra', {
      list: false,
      producto: this.id,
      cnt: this.campo
    });
  }

  showMessage() {
    this.cfSvc.confirm({
      message:
        'Para realizar una compra o agregar al carrito, inicia sesion o registrate.',
      header: 'Quetzalcoatl',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Iniciar Sesion',
      acceptIcon: 'pi pi-fw pi-sign-in',
      acceptButtonStyleClass: 'p-button-outlined p-button-secondary',
      rejectLabel: 'Registrarse',
      rejectIcon: 'pi pi-fw pi-user-edit',
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
      accept: () => {
        this.mtv.redirect(this.router, 'login');
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.mtv.redirect(this.router, '/index/register');
            break;
        }
      },
    });
  }
}
