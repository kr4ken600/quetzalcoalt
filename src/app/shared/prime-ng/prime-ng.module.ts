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
import { MessagesModule } from 'primeng/messages';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

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
    CheckboxModule,
    MessagesModule,
    MenuModule,
    TieredMenuModule,
    DynamicDialogModule
  ],
})
export class PrimeNgModule {}
