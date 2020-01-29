import { Order } from './../order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ProductService } from '../../product/service/product.service';
import { Product } from '../../product/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly url = 'http://localhost:3000/orders';

  private ordersSubject$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  private loaded = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  get(): Observable<Order[]> {
    if (!this.loaded) {
      combineLatest(
        this.http.get<Order[]>(this.url),
        this.productService.get()
      ).pipe(
        map(([orders, products]) => {
          for(const ords of orders){
            const ids = (ords.products as string[]);
            ords.products = ids.map(
              (id) => products.find(prod => prod._id === id)
            );
          }
          return orders;
        }),
        tap((orders) => console.log(orders))
      )
      .subscribe(this.ordersSubject$);
      this.loaded = true;
    }
    return this.ordersSubject$.asObservable();
  }

  add(ord: Order): Observable<Order> {
    const products = (ord.products as Product[]).map(o => o._id);
    return this.http.post<Order>(this.url, {...ord, products})
    .pipe(
      tap(
        (orders: Order) => this.ordersSubject$.getValue()
          .push({...ord, _id: ord._id})
      )
    );
  }

  del(ord: Order): Observable<any> {
    return this.http.delete(`${this.url}/${ord._id}`)
      .pipe(
        tap(() => {
          const orders = this.ordersSubject$.getValue();
          const index = orders.findIndex(o => o._id === ord._id);
          if (index >= 0) {
            orders.splice(index, 1);
          }
        }
      ));
  }

  update(ord: Order): Observable<Product> {
    const products = (ord.products as Product[]).map(o => o._id);
    return this.http.patch<Product>(`${this.url}/${ord._id}`, {...ord, products})
      .pipe(
        tap(() => {
          const orders = this.ordersSubject$.getValue();
          const index = orders.findIndex(o => o._id === ord._id);
          if (index >= 0) {
            orders[index] = ord;
          }
        }
      ));
  }

}
