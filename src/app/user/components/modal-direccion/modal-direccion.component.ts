import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDireccion } from 'src/app/interfaces/direccion';

@Component({
  templateUrl: './modal-direccion.component.html',
  providers: [DynamicDialogRef, DynamicDialogConfig]
})
export class ModalDireccionComponent {
  direccion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.direccion = this.fb.group({
      nombre: ['Kr4ken', Validators.required],
      direccion: ['Otumba, Edo Mex', [Validators.required]],
      codigo: [
        '55935',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      numero: [
        '5541036826',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  create() {
    const { nombre, direccion, codigo, numero } = this.direccion.value;

    const dir: IDireccion = {
      nombre,
      direccion,
      codigo,
      numero,
    };

    // this.ref.close();
    this.ref.close(dir);
  }
}
