import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProductoDetalle } from 'src/app/interfaces/compras';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.css'],
})
export class MostrarPedidosComponent implements OnInit, OnDestroy {
  pedidosEntregados: IProductoDetalle[] = [];
  pedidosNoEntregados: IProductoDetalle[] = [];

  private suscription!: Subscription;

  constructor(private comprasSvc: ComprasService) {
    this.getData();
  }
  ngOnInit(): void {
    this.suscription = this.comprasSvc._refreshCA$.subscribe(() => {
      this.pedidosEntregados = [];
      this.pedidosNoEntregados = [];

      this.getData();
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getData() {
    this.comprasSvc.getAdmin().subscribe((res: any) => {
      res.forEach((detalle: any) => {
        detalle.compralist.forEach((p: IProductoDetalle) => {
          if (p.estatus) {
            this.pedidosEntregados.push(p);
          } else {
            p['iduser'] = detalle.uiduser;
            this.pedidosNoEntregados.push(p);
          }
        });
      });
    });
  }

  updateStatus(data: string[]) {
    this.comprasSvc.updateStatus(data[0], data[1]).subscribe((res) => {
      console.log(res);
    });
  }
}
