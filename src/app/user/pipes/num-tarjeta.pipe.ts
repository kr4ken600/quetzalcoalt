import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numTarjeta',
})
export class NumTarjetaPipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(-3);
  }
}
