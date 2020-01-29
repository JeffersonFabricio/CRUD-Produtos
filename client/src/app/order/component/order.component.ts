import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderService } from '../service/order.service';
import { ProductService } from '../../product/service/product.service';
import { Order } from '../order';
import { Product } from '../../product/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject<any>();

  orderForm: FormGroup = this.fb.group({
    _id: [null],
    products: [[], [Validators.required]]
  });

  orders: Order[] = [];
  products: Product[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.orderService.get()
      .pipe( takeUntil(this.unsubscribe$))
      .subscribe((ords) => this.orders = ords);

    this.productService.get()
      .pipe( takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.products = prods);
  }

  save() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
