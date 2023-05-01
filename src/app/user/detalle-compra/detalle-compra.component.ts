import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { IProductoDetalle } from 'src/app/interfaces/compras';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css'],
})
export class DetalleCompraComponent {
  productos!: IProductoDetalle[];

  direccion!: IDireccion;
  tarjeta!: ITarjeta | null;

  constructor(
    private comprasScv: ComprasService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) {
    this.activatedR.params
      .pipe(switchMap(({ id }) => this.comprasScv.getDetalle(id)))
      .subscribe((res) => {
        this.productos = res;

        this.direccion = res[0].iddireccion;
        this.tarjeta = res[0].idtarjeta;
      });
  }

  redirect(id: string) {
    this.router.navigate(['/index/producto', id]);
  }

  isTarjeta() {
    return this.tarjeta === null ? false : true;
  }
}
