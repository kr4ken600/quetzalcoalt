import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private urlBase: string = 'http://localhost:4001/api/cat';

  constructor(private http: HttpClient) {}

  getcategorias() {
    return this.http.get(this.urlBase).pipe(map((res: any) => res.categorias));
  }

  getFiltro(principal: string) {
    return this.http.get(`${this.urlBase}/${principal}`).pipe(map((res: any) => res.categoria));
  }
}
