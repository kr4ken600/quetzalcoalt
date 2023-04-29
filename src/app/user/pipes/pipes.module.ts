import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumTarjetaPipe } from './num-tarjeta.pipe';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [
    NumTarjetaPipe,
    FechaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumTarjetaPipe,
    FechaPipe
  ]
})
export class PipesModule { }
