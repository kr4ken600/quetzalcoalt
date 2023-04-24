import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, tap } from 'rxjs';
import { ICarritoReq } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private urlBase: string = 'http://localhost:4001/api';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  private headers = new HttpHeaders().set('x-token', this.token ?? '');

  _refreshC$ = new Subject<void>();

  constructor(private http: HttpClient) {}

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

  addCarrito(carrito: ICarritoReq) {
    return this.http.post(`${this.urlBase}/car/new`, carrito, {
      headers: this.headers,
    }).pipe(
      map((res: any) => res)
    );
  }
}
