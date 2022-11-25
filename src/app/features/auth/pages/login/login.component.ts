import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
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
  onsubmit() {
    this.auth
      .login({
        email: this.user.value.email!,
        password: this.user.value.password!,
      })
      .subscribe((user) => {
        localStorage.setItem('token', user.access_token!);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      });
  }
}
