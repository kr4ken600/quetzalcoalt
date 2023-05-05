export interface ICategoria {
  __v: number;
  _id: string;
  principal: string;
  subcategorias: Subcategoria[];
}

export interface Subcategoria {
  _id: string;
  nombre: string;
}
