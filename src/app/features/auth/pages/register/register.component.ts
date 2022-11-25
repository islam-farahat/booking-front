import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {}
  getEmailErrorMessage() {
    if (this.register.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return 'Not a valid Email';
  }
  getErrorMessage() {
    if (this.register.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.register.controls['firstName'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.register.controls['lastName'].hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
  submit() {
    this.auth
      .register({
        firstName: this.register.value.firstName!,
        lastName: this.register.value.lastName!,
        email: this.register.value.email!,
        password: this.register.value.password!,
      })
      .subscribe((user) => {
        this.snackbar.open('تم التسجيل بنجاح', 'اغلاق');
      });
  }
}
