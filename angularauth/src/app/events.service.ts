import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private rootUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.rootUrl + 'events');
  }

  getSpecialEvents() {
    return this.http.get<any>(this.rootUrl + 'special');
  }
}
