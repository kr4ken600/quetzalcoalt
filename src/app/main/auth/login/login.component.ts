import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { IUsuarioReq } from 'src/app/interfaces/usuario.interface';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  msgErrors!: Message[];
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [
        'test@test.com',
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['pass1234', [Validators.required, Validators.minLength(6)]],
      mSesion: [false],
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

    const user: IUsuarioReq = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value,
    };
    const check = this.formLogin.get('mSesion')?.value;

    this.authSvc.login(user, check[0]).subscribe((res) => {
      if (res !== true) {
        this.isError = true;
        this.isLoading = true;
        this.msgErrors = [
          {
            severity: 'error',
            summary: 'Error',
            detail: res,
          },
        ];
        return;
      }
      this.router.navigateByUrl('/dashboard')
    });
  }
}
