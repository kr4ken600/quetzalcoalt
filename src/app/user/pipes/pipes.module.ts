import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumTarjetaPipe } from './num-tarjeta.pipe';
import { FechaPipe } from './fecha.pipe';
import { EstadoCompraPipe } from './estado-compra.pipe';



@NgModule({
  declarations: [
    NumTarjetaPipe,
    FechaPipe,
    EstadoCompraPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumTarjetaPipe,
    FechaPipe,
    EstadoCompraPipe
  ]
})
export class PipesModule { }
