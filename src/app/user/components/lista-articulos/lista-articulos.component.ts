import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICarrito } from 'src/app/interfaces/carrito';
import { MetodosVariosService } from 'src/app/utils/metodos-varios.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styles: [
    `
      .link {
        cursor: pointer;
        color: white;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.5s;
      }

      .link:hover {
        color: #8fa0e2;
      }
    `,
  ],
})
export class ListaArticulosComponent {
  @Input() articulos: ICarrito[] = [];
  @Input() subtotal: number = 0;
  @Input() delete: boolean = false;

  @Output() _eliminar = new EventEmitter<string>();

  constructor(private mtv: MetodosVariosService, private router: Router) {}

  eliminar(id: string) {
    this._eliminar.emit(id);
  }

  redirect(id: string) {
    this.router.navigate(['/index/producto', id]);
  }
}
