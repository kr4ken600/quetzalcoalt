import { Component } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ConfiguracionComponent {
  position!: string;
  isLoading: boolean = false;

  constructor(
    private conf: ConfirmationService,
    private message: MessageService,
    private user:UserService,
    private router:Router
  ) {}

  eliminar(){
    this.confirmPosition('bottom');
  }

  confirmPosition(position: string) {
    this.position = position;
    this.conf.confirm({
      message: '¿Desea eliminar su cuenta?',
      header: 'Cuenta',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-success',
      acceptLabel: 'Confimar',
      rejectButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      accept: () => {

        this.user.deleteUser().subscribe(res => {
          this.message.add({
            severity: 'info',
            summary: 'Cuenta',
            detail: res,
          });

          this.isLoading = true;

          setTimeout(() => {
            this.user.logOut();
            this.router.navigateByUrl('/index/login');
          }, 3000);
        })


      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.message.add({
              severity: 'error',
              summary: 'Cuenta',
              detail: 'Cuenta no eliminada.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.message.add({
              severity: 'warn',
              summary: 'Cuenta',
              detail: 'Cuenta no eliminada.',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }
}
