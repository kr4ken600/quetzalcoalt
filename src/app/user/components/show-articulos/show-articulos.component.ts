import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductoDetalle } from 'src/app/interfaces/compras';

@Component({
  selector: 'app-show-articulos',
  templateUrl: './show-articulos.component.html',
})
export class ShowArticulosComponent {

  @Input() productos: IProductoDetalle[] = [];
  @Input() withBtn: boolean = false;
 
  @Output() changeStatus = new EventEmitter<string[]>();

  updateStatus(id: string, idprod: string){
    const data: string[] = [id, idprod];

    this.changeStatus.emit(data);
  }
}
