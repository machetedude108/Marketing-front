import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscriber } from '../models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private baseUrl = 'http://localhost:8082/api/subscribers';

  constructor(private http: HttpClient) { }

  getAllSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.baseUrl);
  }

  getSubscriberById(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${this.baseUrl}/${id}`);
  }

  createSubscriber(subscriber: Subscriber): Observable<Subscriber> {
    return this.http.post<Subscriber>(this.baseUrl, subscriber);
  }

  updateSubscriber(id: number, subscriber: Subscriber): Observable<Subscriber> {
    return this.http.put<Subscriber>(`${this.baseUrl}/${id}`, subscriber);
  }

  deleteSubscriber(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}