import { AuthService } from './../../../features/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
}
