import * as $ from 'jquery';
import { Component } from '@angular/core';
import { AuthGuardService } from './features/auth/services/auth-guard.service';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sideNav = true;
  login: boolean = false;
  constructor(
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  ngOnInit(): void {
    $('.btn1').css('backgroundColor', '#00AEAE');
  }
  get isLoggedIn() {
    return this.authGuard.loggedIn.asObservable();
  }
  changeColor(btn: number) {
    switch (btn) {
      case 1:
        $('.btn1').css('backgroundColor', '#00AEAE');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 2:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', '#00AEAE');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 3:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', '#00AEAE');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 4:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', '#00AEAE');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 5:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', '#00AEAE');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 6:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', '#00AEAE');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 7:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', '#00AEAE');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 8:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', '#00AEAE');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 9:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', '#00AEAE');
        $('.btn10').css('backgroundColor', 'teal');
        break;
      case 10:
        $('.btn1').css('backgroundColor', 'teal');
        $('.btn2').css('backgroundColor', 'teal');
        $('.btn3').css('backgroundColor', 'teal');
        $('.btn4').css('backgroundColor', 'teal');
        $('.btn5').css('backgroundColor', 'teal');
        $('.btn6').css('backgroundColor', 'teal');
        $('.btn7').css('backgroundColor', 'teal');
        $('.btn8').css('backgroundColor', 'teal');
        $('.btn9').css('backgroundColor', 'teal');
        $('.btn10').css('backgroundColor', '#00AEAE');
        break;

      default:
        break;
    }
  }
  logout() {
    this.authService.logout();
  }
}
