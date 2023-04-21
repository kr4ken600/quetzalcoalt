import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/main/services/productos.service';

@Component({
  selector: 'app-unico',
  templateUrl: './unico.component.html',
  styles: [],
})
export class UnicoComponent implements OnInit {
  articulo!: IProducto;

  campo = 1;

  constructor(
    private prdSvc: ProductosService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.params
      .pipe(switchMap(({ id }) => this.prdSvc.getProducto(id)))
      .subscribe((res) => (this.articulo = res));
  }

  setCnt(status: boolean){
    if(status){
      this.campo += 1;
    } else {
      this.campo -= 1;
    }
  }

  agregar(){
    
  }
}
