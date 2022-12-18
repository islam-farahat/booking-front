import { Component } from '@angular/core';
import { AuthGuardService } from './features/auth/services/auth-guard.service';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  login: boolean = false;
  constructor(
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  ngOnInit(): void {}
  get isLoggedIn() {
    return this.authGuard.loggedIn.asObservable();
  }

  logout() {
    this.authService.logout();
  }
}
