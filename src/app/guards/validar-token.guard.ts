import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../main/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/index');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/index/login');
        }
      })
    );
  }
}
