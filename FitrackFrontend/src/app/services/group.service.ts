import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:8080/api/groups'; 
  private discussionApiUrl = 'http://localhost:8080/api/discussions'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createGroup(name: string, userId: number): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('name', name)
      .set('userId', userId.toString());
    return this.http.post(`${this.apiUrl}/create`, null, { headers, params });
  }

  joinGroup(groupId: number): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('groupId', groupId.toString());
    return this.http.post(`${this.apiUrl}/join`, null, { headers, params });
  }

  getGroup(groupId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/${groupId}`, { headers });
  }

  getGroupMembers(groupId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/${groupId}/members`, { headers });
  }

  createDiscussion(message: string, groupId: number, userId: number): Observable<any> {
    const headers = this.getHeaders();
    const body = { message, groupId, userId };
    return this.http.post(`${this.discussionApiUrl}/create`, body, { headers });
  }

  getDiscussion(discussionId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.discussionApiUrl}/${discussionId}`, { headers });
  }

  getAllDiscussions(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.discussionApiUrl}`, { headers });
  }
}
