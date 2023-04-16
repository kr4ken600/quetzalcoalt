import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    InputTextModule,
    MegaMenuModule,
    CarouselModule,
  ],
})
export class PrimeNgModule {}
