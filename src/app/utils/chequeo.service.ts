import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChequeoService {

  get token(){
    return (localStorage.getItem('token')?? '') || (sessionStorage.getItem('token') ?? '')
  }


  constructor() { }


}
