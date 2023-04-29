export interface ICompras {
  compras: [
    {
      cantidad: number;
      articulo: string;
    }
  ];
  direccion: string;
  tarjeta?: string;
}

export interface IProductoRes {
  _id: string;
  articulo: Articulo;
  cantidad: number;
  fecha_compra: Date;
}

export interface Articulo {
  __v: number;
  _id: string;
  categoria: string;
  descripcion: string;
  img: string;
  marca: string;
  modelo: string;
  precio: number;
  stock: number;
}
