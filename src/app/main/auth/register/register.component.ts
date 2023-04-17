import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['yona', [Validators.required, Validators.minLength(4)]],
      email: ['yon@test.com', [Validators.required, Validators.email]],
      password: ['pass1234', [Validators.required, Validators.minLength(6)]],
      confirmar: ['pass1234', [Validators.required, Validators.minLength(6)]],
    })
  }

  validError(control: string) {
    const campo = this.formRegister.get(control);
    return campo?.errors !== null && campo?.touched;
  }

  register() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }
    console.log(this.formRegister.value);
  }
}
