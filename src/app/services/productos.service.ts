import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBase: string = 'http://localhost:4001/api/product';

  constructor(private http: HttpClient) {}

  getVendido() {
    return this.http.get(`${this.urlBase}/ventas`).pipe(
      map((res: any) => res.productos),
      catchError((err) => of(err.error.msg))
    );
  }

  getAllProdcuts() {
    return this.http.get(`${this.urlBase}/all`).pipe(
      map((res: any) => res.productos),
      catchError((err) => of(err.error.msg))
    );
  }

  getProducto(id: string){
    return this.http.get(`${this.urlBase}/articulo/${id}`).pipe(
      map((res: any) => res.producto),
      catchError((err) => of(err.error.msg))
    );
  }

  getFiltrado(filtro: string) {
    return this.http.get(`${this.urlBase}/${filtro}`).pipe(
      map((res: any) => res.productos),
      catchError((err) => of(err.error.msg))
    );
  }
}
