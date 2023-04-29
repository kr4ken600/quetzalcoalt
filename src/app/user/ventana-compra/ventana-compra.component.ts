import { Component } from '@angular/core';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ActivatedRoute } from '@angular/router';
import { ICarrito } from 'src/app/interfaces/carrito';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { DireccionService } from 'src/app/services/direccion.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ComprasService } from 'src/app/services/compras.service';
import { ICompras } from 'src/app/interfaces/compras';

@Component({
  selector: 'app-ventana-compra',
  templateUrl: './ventana-compra.component.html',
  styles: [],
  providers: [ConfirmationService, MessageService],
})
export class VentanaCompraComponent {
  articulos: ICarrito[] = [];

  tarjetas!: ITarjeta[];
  direcciones!: IDireccion[];

  selectTarjeta!: ITarjeta;
  selectDireccion!: IDireccion;

  cantidad: number = 0;
  subtotal: number = 0;
  metodo: string = '';
  tienda: string = '';

  position!: string;

  isCarrito: boolean = false;
  idArticulo: string = '';

  idTarjeta: string = '';
  idDireccion: string = '';

  constructor(
    private tarjetaSvc: TarjetaService,
    private direccionSvc: DireccionService,
    private carritoSvc: CarritoService,
    private compraSvc: ComprasService,
    private route: ActivatedRoute,
    private prdSvc: ProductosService,
    private confirm: ConfirmationService,
    private message: MessageService
  ) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.producto) {
        this.cantidad = res.cnt;
        this.idArticulo = res.producto;

        this.prdSvc.getProducto(res.producto).subscribe((res) => {
          this.articulos.push({
            articulo: res,
            cantidad: this.cantidad,
          });

          this.subtotal = this.cantidad * res.precio;
        });
      } else {
        this.isCarrito = true;
        this.carritoSvc.getCarrito().subscribe((res) => {
          this.articulos = res;
          this.articulos.forEach((art) => {
            let n = art.articulo.precio * art.cantidad;

            this.subtotal += n;
          });
        });
      }
    });

    this.tarjetaSvc.getTarjetas().subscribe((res) => {
      this.tarjetas = res as ITarjeta[];
    });

    this.direccionSvc.getDirecciones().subscribe((res) => {
      this.direcciones = res as IDireccion[];
      console.log(this.direcciones);
    });
  }

  checkTienda() {
    this.confirmPosition('bottom');
  }

  confirmPosition(position: string) {
    this.position = position;
    this.confirm.confirm({
      message: '¿Desea finalizar la compra?',
      header: 'Confirmación de compra',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-success',
      acceptLabel: 'Confimar',
      rejectButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      accept: this.finalizarCompra,

      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.message.add({
              severity: 'error',
              summary: 'Compra',
              detail: 'Compra cancelada',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.message.add({
              severity: 'warn',
              summary: 'Compra',
              detail: 'Compra cancelada',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  mostrarOptionPago(metodo: string): boolean {
    return metodo === this.metodo;
  }

  isvalid(): boolean {
    if (
      this.metodo !== '' &&
      (this.selectTarjeta !== undefined || this.tienda !== '') &&
      this.selectDireccion !== undefined
    ) {
      return true;
    }

    return false;
  }

  setIdT() {
    console.log(this.selectTarjeta._id);

    this.idTarjeta = this.selectTarjeta._id || '';
  }

  setIdD(id: string) {
    this.idDireccion = id;

    console.log(this.idDireccion);
  }

  finalizarCompra() {
    console.log(this.idTarjeta, this.idDireccion);

    let msg = '';
    if (!this.isCarrito) {
      // const compras: ICompras = {
      //   compras: [
      //     {
      //       cantidad: this.cantidad,
      //       articulo: this.idArticulo,
      //     },
      //   ],
      //   // direccion: this.,
      // };
      // // if(this.metodo === 'tg'){
      // //   compras.compras[0].
      // // }
      // this.compraSvc.comprar(compras).subscribe((res) => {
      //   msg = res.toUpperCase();
      //   this.message.add({
      //     severity: 'info',
      //     summary: 'Compra',
      //     detail: msg,
      //   });
      // });
    }
  }
}
