import { IDireccion } from "./direccion";
import { ITarjeta } from "./tarjeta";

export interface ICompras {
  compras: ICompraItem[];
  idcarrito?: string,
}

export interface ICompraItem {
  identificador: string
  cantidad: number;
  articulo: string;
  iddireccion: string;
  idtarjeta: string | null;
  estatus: boolean;
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

export interface IProductoDetalle {
  _id: string;
  articulo: string;
  cantidad: number;
  estatus: boolean;
  fecha_compra: Date;
  iddireccion: IDireccion;
  idtarjeta: null | ITarjeta;
  iduser?: string
}
