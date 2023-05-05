import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ITarjeta } from 'src/app/interfaces/tarjeta';

@Component({
  selector: 'app-form-tarjeta',
  templateUrl: './form-tarjeta.component.html',
  styles: [],
})
export class FormTarjetaComponent {
  tarjeta!: FormGroup;

  @Output() crear = new EventEmitter<ITarjeta>();

  constructor(private fb: FormBuilder) {
    this.tarjeta = this.fb.group({
      numeroT: [
        '',
        [
          Validators.required,
          Validators.minLength(19),
          Validators.maxLength(19),
        ],
      ],
      nombre: ['', Validators.required],
      fecha: ['', [Validators.required]],
      codigoS: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  getErrors(control: string) {
    const ctrl = this.tarjeta.get(control);

    return ctrl?.errors !== null && ctrl?.touched;
  }

  ejecutar() {
    if (this.tarjeta.invalid) {
      this.tarjeta.markAllAsTouched();
      return;
    }

    const { numeroT, nombre, fecha, codigoS } = this.tarjeta.value;

    const tar: ITarjeta = {
      numeroT: String(numeroT).replaceAll('-', ''),
      nombre,
      fecha,
      codigoS,
    };

    this.crear.emit(tar);
    this.tarjeta.reset();
  }
}
