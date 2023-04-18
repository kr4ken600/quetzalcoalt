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
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from '../main/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserActiveGuard implements CanActivate, CanLoad {
  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.validarToken()
  }

  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (valid) {
          this.router.navigateByUrl('/index');
        }
      }),
      map(value => !value)
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (valid) {
          this.router.navigateByUrl('/index');
        }
      }),
      map(value => !value)
    );
  }
}
