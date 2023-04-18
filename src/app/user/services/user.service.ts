import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { IDireccion } from 'src/app/interfaces/direccion';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBase: string = 'http://localhost:4001/api/user';
  private token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  crearDireccion(direccion: IDireccion) {
    const headers = new HttpHeaders().set('x-token', this.token ?? '');
    return this.http.post(`${this.urlBase}/new`, direccion, { headers });
  }

  getDirecciones() {
    const headers = new HttpHeaders().set('x-token', this.token ?? '');

    return this.http.get(this.urlBase, { headers }).pipe(
      map((res: any) => res.direcciones),
      catchError((err) => of(err.error.msg))
    );
  }
}
