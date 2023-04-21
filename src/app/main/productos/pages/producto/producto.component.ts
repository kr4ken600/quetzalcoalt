import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, filter, switchMap } from 'rxjs';
import { ICategoria } from 'src/app/interfaces/categoria';
import { IProducto } from 'src/app/interfaces/producto';
import { CategoriasService } from 'src/app/main/services/categorias.service';
import { ProductosService } from 'src/app/main/services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [],
})
export class ProductoComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  subItems!: MenuItem[];
  categoria: string = '';
  principal: string = '';

  isLoading: boolean = true;

  articulos: IProducto[] = [];
  private sub!: Subscription;

  constructor(
    private catSvc: CategoriasService,
    private prdSvc: ProductosService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.setData();
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setData();
      });
  }

  setData() {
    this.isLoading = true;
    this.activatedR.params
      .pipe(
        switchMap(({ prn, cat }) => {
          this.principal = prn;
          this.categoria = cat;

          return this.catSvc.getFiltro(prn);
        })
      )
      .subscribe((res: ICategoria[]) => {
        this.subItems = [];
        res.forEach((cat: ICategoria) => {
          this.subItems.push({
            label: cat.nombre,
            icon: 'pi pi-fw pi-tags',
            routerLink: ['/index/tienda', cat.principal, cat.nombre],
          });
        });

        this.items = [
          {
            label: this.principal.toUpperCase(),
            items: this.subItems,
          },
        ];
      });
    this.prdSvc.getFiltrado(this.categoria).subscribe((res: IProducto[]) => {
      this.articulos = res;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

  verMas(id:string){
    this.router.navigate(['/index/producto',id])
  }
}
