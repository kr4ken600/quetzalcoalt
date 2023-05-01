import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ComprasService } from '../services/compras.service';

@Injectable({
  providedIn: 'root',
})
export class ValidCompraGuard implements CanActivate, CanLoad {
  constructor(private compraSvc: ComprasService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.compraSvc.validCompra().pipe(
      tap((valid) => {
        if(!valid) {
          this.router.navigateByUrl('/index');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.compraSvc.validCompra().pipe(
      tap((valid) => {
        if(!valid) {
          this.router.navigateByUrl('/index');
        }
      })
    );
  }
}
