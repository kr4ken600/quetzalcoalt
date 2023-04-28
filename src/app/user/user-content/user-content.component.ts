import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css'],
  providers: [MessageService],
})
export class UserContentComponent implements OnInit, OnDestroy {
  direccion!: IDireccion;
  direcciones: IDireccion[] = [];
  tarjetas: ITarjeta[] = [];

  suscriptD!: Subscription;
  suscriptT!: Subscription;

  constructor(
    private direccionSvc: DireccionService,
    private tarjetaSvc: TarjetaService,
    private mtv: MetodosVariosService,
    private msgSvc: MessageService
  ) {
    this.direccionSvc
      .getDirecciones()
      .subscribe((res) => (this.direcciones = res));
    this.tarjetaSvc.getTarjetas().subscribe((res) => (this.tarjetas = res));
  }
  ngOnDestroy(): void {
    this.suscriptD.unsubscribe();
    this.suscriptT.unsubscribe();
  }
  ngOnInit(): void {
    this.suscriptD = this.direccionSvc._refreshD$.subscribe(() => {
      this.direccionSvc
        .getDirecciones()
        .subscribe((res) => (this.direcciones = res));
    });

    this.suscriptT = this.tarjetaSvc._refreshT$.subscribe(() => {
      this.tarjetaSvc.getTarjetas().subscribe((res) => (this.tarjetas = res));
    });
  }

  crearDireccion(dir: IDireccion) {
    this.direccionSvc.crearDireccion(dir).subscribe((res) => {
      this.mtv.showMsg(this.msgSvc, 'success', 'Direccion', res);
    });
  }

  eliminarDireccion(id: string) {
    this.direccionSvc.deleteDireccion(id).subscribe((res) => {
      this.mtv.showMsg(this.msgSvc, 'warn', 'Direccion', res);
    });
  }

  crearTarjeta(tar: ITarjeta) {
    this.tarjetaSvc.crearTarjeta(tar).subscribe((res) => {
      this.mtv.showMsg(this.msgSvc, 'success', 'Tarjeta', res);
    });
  }

  eliminarTarjeta(id: string) {
    this.tarjetaSvc.deleteTarjeta(id).subscribe((res) => {
      this.mtv.showMsg(this.msgSvc, 'warn', 'Tarjeta', res);
    });
  }
}
