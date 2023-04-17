import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    InputTextModule,
    MegaMenuModule,
    CarouselModule,
    ImageModule,
    CardModule,
    FieldsetModule,
    CheckboxModule
  ],
})
export class PrimeNgModule {}
