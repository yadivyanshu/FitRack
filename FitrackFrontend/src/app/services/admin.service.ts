import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) {}

  createAdmin(adminData: any) {
    const token = localStorage.getItem('token'); 
    console.log("token gen from local storage"+token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, adminData, { headers });
  }
}