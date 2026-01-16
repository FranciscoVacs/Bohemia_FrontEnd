import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development.js';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.js';
import { Observable } from 'rxjs'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener eventos futuros (público)
  getFutureEvents(): Observable<Event> {
    return this.http.get<{data: Event}>(`${this.apiUrl}/event/future`)
      .pipe(map(response =>response.data));
  }

  // Obtener un evento por ID (público)
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/event/${id}`);
  }

  // Obtener tipos de entrada de un evento (público)
  getTicketTypes(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event/${eventId}/ticketType`);
  }
}
