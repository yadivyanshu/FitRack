import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/teams';
  private userUrl = 'http://localhost:8080/users/me'; // URL to fetch user details
  private eventUrl = 'http://localhost:8080/events'; // URL to fetch events

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllTeams(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getTeamById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  createTeam(team: any): Observable<any> {
    const headers = this.getHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl, team, { headers });
  }

  updateTeam(id: number, team: any): Observable<any> {
    const headers = this.getHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(`${this.baseUrl}/${id}`, team, { headers });
  }

  deleteTeam(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  joinTeam(teamId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/${teamId}/join`, {}, { headers });
  }

  getUserDetails(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userUrl, { headers });
  }

  getEvents(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.eventUrl, { headers });
  }
}
