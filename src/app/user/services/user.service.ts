import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, pipe, tap } from 'rxjs';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBase: string = 'http://localhost:4001/api';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  private headers = new HttpHeaders().set('x-token', this.token ?? '');
  _refreshD$ = new Subject<void>();
  _refreshT$ = new Subject<void>();
  _refreshC$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  crearDireccion(direccion: IDireccion) {
    return this.http
      .post(`${this.urlBase}/address/new`, direccion, {
        headers: this.headers,
      })
      .pipe(
        tap(() => {
          this._refreshD$.next();
        }),
        map((res: any) => res.msg)
      );
  }

  getDirecciones() {
    return this.http
      .get(`${this.urlBase}/address`, { headers: this.headers })
      .pipe(
        map((res: any) => res.direcciones),
        catchError((err) => of(err.error.msg))
      );
  }

  deleteDireccion(id: string) {
    return this.http
      .delete(`${this.urlBase}/address/${id}`, { headers: this.headers })
      .pipe(
        tap(() => {
          this._refreshD$.next();
        }),
        map((res: any) => res.msg)
      );
  }

  crearTarjeta(tar: ITarjeta) {
    return this.http
      .post(`${this.urlBase}/tarjet/new`, tar, {
        headers: this.headers,
      })
      .pipe(
        tap(() => {
          this._refreshT$.next();
        }),
        map((res: any) => res.msg)
      );
  }

  getTarjetas() {
    return this.http
      .get(`${this.urlBase}/tarjet`, { headers: this.headers })
      .pipe(
        map((res: any) => res.tarjetas),
        catchError((err) => of(err.error.msg))
      );
  }

  deleteTarjeta(id: string) {
    return this.http
      .delete(`${this.urlBase}/tarjet/${id}`, { headers: this.headers })
      .pipe(
        tap(() => {
          this._refreshT$.next();
        }),
        map((res: any) => res.msg)
      );
  }

  getCarrito() {
    return this.http.get(`${this.urlBase}/car`, { headers: this.headers }).pipe(
      map((res: any) => res.carrito),
      catchError((err) => of(err.error.msg))
    );
  }

  deleteCarrito(id: string) {
    return this.http
      .delete(`${this.urlBase}/car/${id}`, { headers: this.headers })
      .pipe(
        tap(() => {
          this._refreshC$.next();
        }),
        map((res: any) => res)
      );
  }
}
