import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient , private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.rootUrl + 'register', user);
  }

  loginUser(user) {
    return this.http.post<any>(this.rootUrl + 'login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser = () => {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
