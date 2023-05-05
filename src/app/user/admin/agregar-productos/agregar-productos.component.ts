import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ICategoria } from 'src/app/interfaces/categoria';
import { IProducto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css'],
  providers: [MessageService]
})
export class AgregarProductosComponent implements OnInit {
  form!: FormGroup;
  categorias: SelectItemGroup[] = [];

  uploadedFiles: File[] = [];

  isUpload: boolean = false;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private catSvc: CategoriasService,
    private prodSvc: ProductosService,
    private msg: MessageService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      marca: [null, Validators.required],
      modelo: ['generico', Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
      categoria: [null, Validators.required],
    });

    this.catSvc.getcategorias().subscribe((res: ICategoria[]) => {
      let items: SelectItem[] = [];
      
      res.forEach((cat) => {
        const exist = this.categorias.find((e) => e.label === cat.principal);
        if (!exist) {
          cat.subcategorias.forEach((sub) => {
            console.log(sub.nombre);
            
            items.push({
              label: sub.nombre.toUpperCase(),
              value: sub.nombre,
            });
          });

          this.categorias.push({
            label: cat.principal.toUpperCase(),
            items: items,
          });

          items = [];
        }
      });
    });
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.isUpload = true;
  }

  isValid() {
    return this.form.valid && this.isUpload;
  }

  saveProd() {
    const prod: IProducto = {
      marca: this.form.get('marca')?.value,
      modelo: this.form.get('modelo')?.value,
      descripcion: this.form.get('descripcion')?.value,
      precio: this.form.get('precio')?.value,
      stock: this.form.get('stock')?.value,
      categoria: this.form.get('categoria')?.value,
      img: this.uploadedFiles[0].name.split('.')[0],
    };

    this.prodSvc.upload(prod).subscribe((res: any) => {
      this.isLoading = true;
      setTimeout(() => {
        this.msg.add({
          severity: 'info',
          summary: 'Producto',
          detail: res.msg,
        });
        this.form.reset();
        this.form.get('modelo')?.setValue('generico')
        this.isLoading = false;
        this.uploadedFiles = [];
      }, 1500);
    });
  }
}
