import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, pipe, tap } from 'rxjs';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    
  }
}
