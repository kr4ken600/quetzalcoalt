import { Component } from '@angular/core';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ICompraItem, ICompras } from 'src/app/interfaces/compras';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';

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

  cantidad: number = 0;
  subtotal: number = 0;
  metodo: string = '';
  tienda: string = '';

  position!: string;

  isCarrito: boolean = false;
  isLoading: boolean = false;

  idArticulo: string = '';
  idCarrito!: string;

  form!: FormGroup;

  constructor(
    private mtv: MetodosVariosService,
    private tarjetaSvc: TarjetaService,
    private direccionSvc: DireccionService,
    private carritoSvc: CarritoService,
    private compraSvc: ComprasService,
    private route: ActivatedRoute,
    private router: Router,
    private prdSvc: ProductosService,
    private confirm: ConfirmationService,
    private message: MessageService,
    private fb: FormBuilder
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
          
          this.idCarrito = res[0]._id;
          
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
    });

    this.form = this.fb.group({
      tarjeta: [null],
      direccion: [null, Validators.required],
    });
  }

  checkTienda() {
    this.confirmPosition('bottom');
  }

  getDataForm(control: string) {
    const ctrl = this.form.get(control);

    return ctrl?.value;
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
      accept: () => {
        const { tarjeta, direccion } = this.form.value;
        let msg = '';
        if (!this.isCarrito) {
          let compras: ICompras = {
            compras: [
              {
                cantidad: this.cantidad,
                articulo: this.idArticulo,
                iddireccion: direccion._id,
                idtarjeta: tarjeta !== null ? tarjeta._id : null,
                estatus: false,
              },
            ],
          };

          this.compraSvc.comprar(compras).subscribe((res) => {
            msg = res.toUpperCase();
            this.message.add({
              severity: 'info',
              summary: 'Compra',
              detail: msg,
            });
          });
        } else {
          let idsArticulo: ICompraItem[] = [];

          this.articulos.forEach((art) => {
            idsArticulo.push({
              cantidad: art.cantidad,
              articulo: art.articulo._id!,
              iddireccion: direccion._id,
              idtarjeta: tarjeta !== null ? tarjeta._id : null,
              estatus: false,
            });
          });

          let compras: ICompras = {
            compras: idsArticulo,
            idcarrito: this.idCarrito
          };

          this.compraSvc.comprar(compras).subscribe((res) => {
            msg = res.toUpperCase();
            this.message.add({
              severity: 'info',
              summary: 'Compra',
              detail: msg,
            });
          });
        }

        this.isLoading = true;
        setTimeout(() => {
          this.mtv.redirect(this.router, '/dashboard/compras');
          this.mtv.deleteLocalS();
        }, 2000);
      },

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
      (this.getDataForm('tarjeta') !== null || this.tienda !== '') &&
      this.getDataForm('direccion') !== null 
    ) {
      return true;
    }

    return false;
  }
}
