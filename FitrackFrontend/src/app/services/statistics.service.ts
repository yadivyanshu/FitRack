import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistics } from './statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  [x: string]: any;
  private apiUrl = 'http://localhost:8080/statistics';

  constructor(private http: HttpClient) { }

  getStatisticsByUserId(userId: number): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(`${this.apiUrl}/user/${userId}`);
  }
}