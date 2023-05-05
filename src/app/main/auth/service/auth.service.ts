import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IResponseUsuario } from 'src/app/interfaces/response.interface';
import { IUsuarioReq, IUsuarioRes } from 'src/app/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rutaBase: string = 'http://localhost:4001/api/auth';
  private _usuario!: IUsuarioRes;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  private setUser(uid: string, username: string, role: string) {
    this._usuario = {
      uid,
      username,
      role: role,
    };
  }

  login(user: IUsuarioReq, check: boolean) {
    return this.http.post<IResponseUsuario>(`${this.rutaBase}`, user).pipe(
      tap((res) => {
        this.setUser(res.uid!, res.username!, res.role);
        if (res.ok && check) {
          localStorage.setItem('token', res.token!);
        } else {
          sessionStorage.setItem('token', res.token!);
        }
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  register(user: IUsuarioReq) {
    return this.http.post<IResponseUsuario>(`${this.rutaBase}/new`, user).pipe(
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('x-token', token ?? '');
    return this.http
      .get<IResponseUsuario>(`${this.rutaBase}/renew`, { headers })
      .pipe(
        map((res) => {
          this.setUser(res.uid!, res.username!, res.role);
          return res.ok;
        }),
        catchError((err) => of(false))
      );
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
