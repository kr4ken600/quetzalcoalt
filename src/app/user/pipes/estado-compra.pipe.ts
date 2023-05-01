import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoCompra'
})
export class EstadoCompraPipe implements PipeTransform {

  transform(status: boolean): string {
    if(status){
      return 'Entregado'
    }

    return 'En proceso';
  }

}
