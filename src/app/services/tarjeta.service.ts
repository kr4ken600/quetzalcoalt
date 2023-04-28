import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITarjeta } from '../interfaces/tarjeta';
import { Subject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private urlBase: string = 'http://localhost:4001/api';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  private headers = new HttpHeaders().set('x-token', this.token ?? '');
  _refreshT$ = new Subject<void>();

  constructor(private http: HttpClient) { }

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
}
