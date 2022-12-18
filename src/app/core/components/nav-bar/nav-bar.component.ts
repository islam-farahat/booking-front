import { AuthService } from './../../../features/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/features/auth/services/auth-guard.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  // login: boolean = false;
  // constructor(
  //   private authService: AuthService,
  //   private authGuard: AuthGuardService
  // ) {}
  ngOnInit(): void {}
  // get isLoggedIn() {
  //   return this.authGuard.loggedIn.asObservable();
  // }
  // logout() {
  //   this.authService.logout();
  // }
}
