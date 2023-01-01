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
    $('.btn1').css('backgroundColor', 'gray');
  }
  get isLoggedIn() {
    return this.authGuard.loggedIn.asObservable();
  }
  changeColor(btn: number) {
    switch (btn) {
      case 1:
        $('.btn1').css('backgroundColor', 'gray');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 2:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'gray');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 3:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'gray');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 4:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'gray');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 5:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'gray');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 6:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'gray');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 7:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'gray');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 8:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'gray');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 9:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'gray');
        $('.btn10').css('backgroundColor', 'white');
        break;
      case 10:
        $('.btn1').css('backgroundColor', 'white');
        $('.btn2').css('backgroundColor', 'white');
        $('.btn3').css('backgroundColor', 'white');
        $('.btn4').css('backgroundColor', 'white');
        $('.btn5').css('backgroundColor', 'white');
        $('.btn6').css('backgroundColor', 'white');
        $('.btn7').css('backgroundColor', 'white');
        $('.btn8').css('backgroundColor', 'white');
        $('.btn9').css('backgroundColor', 'white');
        $('.btn10').css('backgroundColor', 'gray');
        break;

      default:
        break;
    }
  }
  logout() {
    this.authService.logout();
  }
}
