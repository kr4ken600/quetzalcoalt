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
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

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
    AccordionModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule
  ],
})
export class PrimeNgModule {}
