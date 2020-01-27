import { Order } from './../order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly url = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  add(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }
}
