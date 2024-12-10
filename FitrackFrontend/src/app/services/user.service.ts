import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  followUser(userId: number, followerId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${followerId}/follow`, userId );
  }

  unfollowUser(userId: number, followerId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${userId}/unfollow`,  followerId );
  }

  getLoginCount(userId:number):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/login-count/${userId}`); 
  }
}