import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css'],
  providers: [MessageService],
})
export class EditarProductosComponent implements OnInit, OnDestroy {
  productos: IProducto[] = [];

  producto!: IProducto | undefined;

  form!: FormGroup;

  isSelect: boolean = true;

  suscript!: Subscription;

  constructor(
    private prdSvc: ProductosService,
    private fb: FormBuilder,
    private msg: MessageService
  ) {
    this.prdSvc.getAllProdcuts().subscribe((res) => {
      this.productos = res;
    });

    this.form = this.fb.group({
      producto: [null, Validators.required],
      stock: [null, Validators.required],
      id: [null, Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.suscript.unsubscribe;
  }
  ngOnInit(): void {
    this.suscript = this.prdSvc._refreshP$.subscribe(() => {
      this.prdSvc.getAllProdcuts().subscribe((res) => {
        this.productos = res;
      });
    });
  }

  getDataMarca() {
    return this.producto === undefined ? '' : this.producto.marca;
  }

  getDataStock() {
    return this.producto === undefined ? '' : this.producto.stock;
  }

  onRowSelect(event: any) {
    this.form.get('producto')?.setValue(this.producto?.marca);
    this.form.get('stock')?.setValue(this.producto?.stock);
    this.form.get('id')?.setValue(this.producto?._id);
  }

  onRowUnselect() {
    this.form.get('producto')?.setValue(null);
    this.form.get('stock')?.setValue(null);
    this.form.get('id')?.setValue(null);
  }

  actualizar() {
    const { producto, stock, id } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    const data = {
      producto,
      stock,
    };

    this.prdSvc.update(id, data).subscribe((res) => {
      this.msg.add({ severity: 'info', summary: 'Producto', detail: res });
    });
  }
}
