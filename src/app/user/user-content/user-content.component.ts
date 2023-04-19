import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

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

  constructor(private userSvc: UserService, private msgSvc: MessageService) {
    this.userSvc.getDirecciones().subscribe((res) => (this.direcciones = res));
    this.userSvc.getTarjetas().subscribe((res) => (this.tarjetas = res));
  }
  ngOnDestroy(): void {
    this.suscriptD.unsubscribe();
    this.suscriptT.unsubscribe();
  }
  ngOnInit(): void {
    this.suscriptD = this.userSvc._refreshD$.subscribe(() => {
      this.userSvc
        .getDirecciones()
        .subscribe((res) => (this.direcciones = res));
    });

    this.suscriptT = this.userSvc._refreshT$.subscribe(() => {
      this.userSvc.getTarjetas().subscribe((res) => (this.tarjetas = res));
    });
  }

  crearDireccion(dir: IDireccion) {
    this.userSvc.crearDireccion(dir).subscribe((res) => {
      this.showMsg('success', 'Direccion', res);
    });
  }

  
  eliminarDireccion(id: string) {
    this.userSvc.deleteDireccion(id).subscribe((res) => {
      this.showMsg('warn', 'Direccion', res);
    });
  }

  crearTarjeta(tar: ITarjeta) {
    this.userSvc.crearTarjeta(tar).subscribe((res) => {
      this.showMsg('success', 'Tarjeta', res);
    });
  }

  eliminarTarjeta(id: string) {
    this.userSvc.deleteTarjeta(id).subscribe((res) => {
      this.showMsg('warn', 'Tarjeta', res);
    });
  }

  showMsg(sev: string, sum: string, res: string) {
    this.msgSvc.add({
      severity: sev,
      summary: sum,
      detail: res,
    });
  }
}
