import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { IUsuarioReq } from 'src/app/interfaces/usuario.interface';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  msgErrors!: Message[];
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['yona', [Validators.required, Validators.minLength(4)]],
      email: [
        'yon@test.com',
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['pass1234', [Validators.required, Validators.minLength(6)]],
      confirmar: ['pass1234', [Validators.required, Validators.minLength(6)]],
    });
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

    const user: IUsuarioReq = {
      username: this.formRegister.get('username')?.value,
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value,
    };

    this.auth.register(user).subscribe((res) => {
      this.isError = true;
      this.isLoading = true;
      if (res !== true) {
        this.msgErrors = [
          {
            severity: 'error',
            summary: 'Error',
            detail: res,
          },
        ];
      } else {
        this.msgErrors = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Usuario creado correctamente',
          },
        ];
        setTimeout(() => {
          this.router.navigateByUrl('/index/login');
        }, 2500);
      }
    });
  }
}
