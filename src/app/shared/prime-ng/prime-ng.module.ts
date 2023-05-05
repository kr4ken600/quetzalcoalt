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
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    DataViewModule,
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
    ToastModule,
    TagModule,
    SkeletonModule,
    ConfirmDialogModule,
    TableModule,
    DropdownModule,
    RadioButtonModule,
    TabMenuModule,
    InputTextareaModule,
    FileUploadModule,
    PanelModule
  ],
})
export class PrimeNgModule {}
