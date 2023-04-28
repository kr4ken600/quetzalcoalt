import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, tap } from 'rxjs';
import { IDireccion } from '../interfaces/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private urlBase: string = 'http://localhost:4001/api';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  private headers = new HttpHeaders().set('x-token', this.token ?? '');
  _refreshD$ = new Subject<void>();

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
}
