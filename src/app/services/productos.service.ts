import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, tap } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBase: string = 'http://localhost:4001/api/product';

  _refreshP$ = new Subject<void>()

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

  getProducto(id: string) {
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

  upload(prod: IProducto) {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const headers = new HttpHeaders().set('x-token', token ?? '');

    return this.http.post(`${this.urlBase}/new`, prod, { headers }).pipe(
      map((res: any) => {
        if (res.ok) {
          return { msg: 'Producto agregado correctamente' };
        }
        return { msg: 'Algo salio mal' };
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  update(id: string, data: any) {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const headers = new HttpHeaders().set('x-token', token ?? '');

    return this.http.post(`${this.urlBase}/update/${id}`, data, { headers }).pipe(
      tap(() => {
        this._refreshP$.next();
      }),
      map((res: any) => res.msg)
    );
  }
}
