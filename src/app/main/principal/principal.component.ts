import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { IProducto } from '../../interfaces/producto';

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
  productosT: IProducto[] = [
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
    {
      categoria: 'cubiertas',
      descripcion: 'Cubierta Delantera De Faro P/ Bajaj Pulsar NS200',
      img: 'c1',
      marca: 'Bajaj',
      modelo: 'Pulsar ns 200',
      precio: 210,
      stock: 10,
      _id: '643f5533f72cb7316a662161',
    },
  ];
  responsiveOptions!: any[];
  productos: IProducto[] = [];

  imgCarousel: string[] = [
    'assets/presentacion/carrucel.png',
    'assets/presentacion/carrucel2.png',
    'assets/presentacion/carrucel3.png',
    'assets/presentacion/carrucel4.png',
  ];

  constructor(private prodSvc: ProductosService) {}
  ngOnInit(): void {
    this.prodSvc.getVendido().subscribe((res) => {
      res.forEach((element: IProducto[]) => {
        this.productos.push(element[0]);
      });
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
