import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numTarjeta',
})
export class NumTarjetaPipe implements PipeTransform {
  transform(value: string, caracter?: string): string {
    if(caracter){
      let c = '';
      for (let i = 0; i < 13; i++) {
        c += caracter;
      }
      return c + value.slice(-3);
    }
    return value.slice(-3);
  }
}
