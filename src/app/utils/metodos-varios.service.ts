import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MetodosVariosService {

  constructor() { }

  showMsg(msgSvc: MessageService, sev: string, sum: string, res: string) {
    msgSvc.add({
      severity: sev,
      summary: sum,
      detail: res,
    });
  }

  redirect(router:Router, ruta: string) {
    router.navigateByUrl(ruta);
  }

  redirectQuery(router:Router, ruta: string, query: Params) {
    router.navigate([ruta], {
      queryParams: query
    });
  }
}
