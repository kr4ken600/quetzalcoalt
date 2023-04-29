import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date, estatus: boolean = false): string {
    const newFech = fecha.toLocaleString();
    
    if(estatus){
      return `Entregado el ${newFech.split('T')[0]}`;
    }

    return `Pedido el ${newFech.split('T')[0]}`;
  }

}
