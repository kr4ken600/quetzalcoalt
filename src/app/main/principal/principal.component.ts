import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
    `
      .card {
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class PrincipalComponent implements OnInit {
  responsiveOptions!: any[];
  consumibles: IProducto[] = [];
  accesorios: IProducto[] = [];
  cascos: IProducto[] = [];
  llantas: IProducto[] = [];
  protecciones: IProducto[] = [];

  isLoading: boolean = true;

  imgCarousel: string[] = [
    'assets/presentacion/carrucel.png',
    'assets/presentacion/carrucel2.png',
    'assets/presentacion/carrucel3.png',
    'assets/presentacion/carrucel4.png',
  ];

  constructor(private prodSvc: ProductosService) {}
  ngOnInit(): void {
    this.prodSvc.getVendido().subscribe((res) => {
      this.consumibles = res.filter((r: any) => r.principal === 'consumibles');
      this.accesorios = res.filter((r: any) => r.principal === 'accesorios');
      this.cascos = res.filter((r: any) => r.principal === 'cascos');
      this.llantas = res.filter((r: any) => r.principal === 'llantas');
      this.protecciones = res.filter(
        (r: any) => r.principal === 'protecciones'
      );

      this.isLoading = false;
      
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
