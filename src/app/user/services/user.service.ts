import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, pipe, tap } from 'rxjs';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private rutaBase: string = 'http://localhost:4001/api/auth';

  constructor(private http: HttpClient) {}

  deleteUser() {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('x-token', token ?? '');
    return this.http
      .delete(`${this.rutaBase}/user`, { headers })
      .pipe(map((res: any) => res.msg));
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
