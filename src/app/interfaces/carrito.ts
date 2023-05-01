import { IProducto } from './producto';

export interface ICarrito {
  _id?: string;
  articulo: IProducto;
  cantidad: number;
}

export interface ICarritoReq {
  articulo: string;
  cantidad: number;
}
