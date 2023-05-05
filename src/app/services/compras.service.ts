import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, of, tap } from 'rxjs';
import { ICompras } from '../interfaces/compras';

interface IResponse {
  msg: string;
  ok: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private urlBase: string = 'http://localhost:4001/api';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  private headers = new HttpHeaders().set('x-token', this.token ?? '');

  _refreshCA$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  comprar(compras: ICompras) {
    return this.http
      .post<IResponse>(`${this.urlBase}/shop/update`, compras, {
        headers: this.headers,
      })
      .pipe(map((res: IResponse) => res.msg));
  }

  getCompras() {
    return this.http
      .get(`${this.urlBase}/shop`, {
        headers: this.headers,
      })
      .pipe(map((res: any) => res.compras[0].compralist));
  }

  getDetalle(id: string) {
    return this.http
      .get(`${this.urlBase}/shop/${id}`, {
        headers: this.headers,
      })
      .pipe(map((res: any) => res.articulo));
  }

  getAdmin() {
    return this.http
      .get(`${this.urlBase}/shop/admin/all`, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res.detalles;
        }),
      );
  }

  updateStatus(uid: string, idprod:string) {
    return this.http.post(`${this.urlBase}/shop/admin/update`, {uid, idprod}, {
      headers: this.headers,
    }).pipe(
      tap(() => {
        this._refreshCA$.next();
      }),
      map((res: any) => res.msg)
    );
  }

  validCompra() {
    const idCompra = localStorage.getItem('idcompra');

    return idCompra === null ? of(false) : of(true);
  }
}
