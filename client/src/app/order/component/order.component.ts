import { MatSnackBar } from '@angular/material';
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
  prods: Product[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.orderService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ords) => this.orders = ords);

    this.productService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.prods = prods);
  }

  save() {
    const data = this.orderForm.value;
    if (data._id) {
      this.orderService.update(data)
        .subscribe(
          () => this.notify('Atualizado'),
          (err) => this.notify(err.error.msg)
        );
    } else {
      this.orderService.add(data)
        .subscribe(
          () => this.notify('Salvo'),
          (err) => this.notify(err.error.msg)
        );
    }
  }

  delete(ord: Order) {
    this.orderService.del(ord)
      .subscribe(
        () => this.notify('Deletado!'),
        (err) => this.notify(err.error.msg)
      );
  }

  cancel() {
    this.clearFields();
  }

  clearFields() {
    this.orderForm.controls.products.setValue(null);
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 3000});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
