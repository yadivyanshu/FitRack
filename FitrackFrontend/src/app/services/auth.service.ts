import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logins() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

  private registerUrl = 'http://localhost:8080/auth/signup';
  private loginUrl = 'http://localhost:8080/auth/login';
  private createAdminUrl = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.createAdminUrl, admin);
  }

  getRolesFromToken(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.parseJwt(token);
      const a = payload.sub;
      if(a.includes('admin')){
        return ['ADMIN'];
      }
      else
      return payload.sub || [];
    }
    return [];
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
