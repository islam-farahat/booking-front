import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')!)) {
      this.router.navigate(['/home']);
    }
  }
  getEmailErrorMessage() {
    if (this.user.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return 'Not a valid Email';
  }
  getPasswordErrorMessage() {
    if (this.user.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
  getErrorMessage() {
    if (this.user.errors?.['unauthenticated']) {
      return 'Email or password incorrect';
    }

    return '';
  }
  onsubmit() {
    this.auth
      .login({
        email: this.user.value.email!,
        password: this.user.value.password!,
      })
      .subscribe({
        error: (error) => {
          this.user.setErrors({ unauthenticated: true });
        },
        next: (user) => {
          localStorage.setItem('token', user.access_token!);
          localStorage.setItem('user', JSON.stringify(user));
        },
        complete: () => {
          this.router.navigate(['/home']);
        },
      });
  }
}
