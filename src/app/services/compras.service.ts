import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
      .pipe(map((res: any) => res.compras[0].productos));
  }
}
