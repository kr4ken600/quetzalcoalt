import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalDireccionComponent } from '../components/modal-direccion/modal-direccion.component';
import { IDireccion } from 'src/app/interfaces/direccion';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css'],
  providers: [DialogService],
})
export class UserContentComponent implements OnDestroy {

  direccion!: IDireccion;
  
  constructor(private userSvc: UserService, public dialogSvc: DialogService) {
    console.log(this.direccion);
    
    // this.userSvc.getDirecciones().subscribe((res) => console.log(res));
  }
  
  ref!: DynamicDialogRef;

  showDire() {
    this.ref = this.dialogSvc.open(ModalDireccionComponent, {
      header: 'Crear Direccion',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      
    });

    this.ref.onClose.subscribe((dir: IDireccion) => {
      if (dir) {
        this.direccion = dir;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
