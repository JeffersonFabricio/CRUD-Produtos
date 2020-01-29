import { Product } from './../product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';

  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]> {
    if (!this.loaded) {
      this.http.get<Product[]>(this.url)
        .pipe(tap((prods) => console.log(prods)),
          delay(1000))
        .subscribe(this.productsSubject$);
      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  add(prod: Product): Observable<Product> {
    return this.http.post<Product>(this.url, prod)
    .pipe(
      tap((prods: Product) => this.productsSubject$.getValue().push(prods))
    );
  }

  del(prod: Product): Observable<any> {
    return this.http.delete(`${this.url}/${prod._id}`)
      .pipe(
        tap(() => {
          const products = this.productsSubject$.getValue();
          const index = products.findIndex(p => p._id === prod._id);
          if (index >= 0) {
            products.splice(index, 1);
          }
        }
      ));
  }

  update(prod: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/${prod._id}`, prod)
      .pipe(
        tap((p) => {
          const products = this.productsSubject$.getValue();
          const index = products.findIndex(p => p._id === prod._id);
          if (index >= 0) {
            products[index].name = p.name;
          }
        })
      );
  }

}
