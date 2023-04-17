import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['yon@test.com', [Validators.required, Validators.email]],
      password: ['pass1234', [Validators.required, Validators.minLength(6)]],
      mSesion: [[]]
    });
  }

  validError(control: string) {
    const campo = this.formLogin.get(control);
    return campo?.errors !== null && campo?.touched;
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    console.log(this.formLogin.value);
  }
}
