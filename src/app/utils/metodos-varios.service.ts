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


  setLocalS(){
    localStorage.setItem('idcompra', 'jy6GtNrbk6');
  }

  deleteLocalS(){
    localStorage.removeItem('idcompra');
  }

  identifdicador() {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return id;
};
}
