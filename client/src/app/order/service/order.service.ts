import { Order } from './../order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly url = 'http://localhost:3000/orders';

  private ordersSubject$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Order[]> {
    if (!this.loaded) {
      this.http.get<Order[]>(this.url)
        .pipe(tap((prods) => console.log(prods)))
        .subscribe(this.ordersSubject$);
      this.loaded = true;
    }
    return this.ordersSubject$.asObservable();
  }

  add(ord: Order): Observable<Order> {
    return this.http.post<Order>(this.url, ord)
    .pipe(
      tap((orders: Order) => this.ordersSubject$.getValue().push(orders))
    );
  }
}
