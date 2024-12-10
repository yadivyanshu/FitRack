import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';
  private bookingApiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  updateEvent(id: number, event: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchEvents(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
  }

  filterEvents(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filter?startDate=${startDate}&endDate=${endDate}`);
  }

  bookEvent(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.bookingApiUrl}/events/${bookingData.eventId}`, bookingData);
  }
}
