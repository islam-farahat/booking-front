import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authGard: AuthGuardService
  ) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/register`, user);
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/login`, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/auth/update`, user);
  }
  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.API_URL}/auth/delete`);
  }

  logout() {
    this.authGard.loggedIn.next(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
