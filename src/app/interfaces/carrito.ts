import { IProducto } from './producto';

export interface ICarrito {
  id?: string;
  articulo: IProducto;
  cantidad: number;
}

export interface ICarritoReq {
  articulo: string;
  cantidad: number;
}
