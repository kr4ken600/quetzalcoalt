import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDireccion } from 'src/app/interfaces/direccion';

@Component({
  selector: 'app-direccion-form',
  templateUrl: './modal-direccion.component.html',
})
export class ModalDireccionComponent {
  direccion!: FormGroup;

  @Output() crear = new EventEmitter<IDireccion>();

  constructor(private fb: FormBuilder) {
    this.direccion = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', [Validators.required]],
      codigo: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      numero: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  getErrors(control: string) {
    const ctrl = this.direccion.get(control);

    return ctrl?.errors !== null && ctrl?.touched;
  }

  ejecutar() {
    if (this.direccion.invalid) {
      console.log(this.direccion.controls['codigo'].errors);

      this.direccion.markAllAsTouched();
      return;
    }

    const { nombre, direccion, codigo, numero } = this.direccion.value;

    const dir: IDireccion = {
      nombre,
      direccion,
      codigo,
      numero: String(numero).replaceAll('-', ''),
    };

    this.crear.emit(dir);
    this.direccion.reset();
  }
}
