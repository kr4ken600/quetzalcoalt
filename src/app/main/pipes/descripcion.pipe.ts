import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcion',
})
export class DescripcionPipe implements PipeTransform {
  transform(value: string): unknown {
    value = value.substring(0, 50) + '...';
    return value;
  }
}
