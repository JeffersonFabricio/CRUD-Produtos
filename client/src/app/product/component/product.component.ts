import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject();
  products: Product[] = [];

  productForm: FormGroup = this.fb.group({
    _id: [null],
    productName: ['', [Validators.required, Validators.min(0)]],
    productDescription: ['', [Validators.required, Validators.min(0)]],
    productPrice: [0, [Validators.required, Validators.min(0)]],
    productLinkProduct: ['', [Validators.required]],
    productLinkImg: ['', [Validators.required]]
  });

  productEdit: Product = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.get()
    .pipe( takeUntil(this.unsubscribe$) )
    .subscribe(
      (prods) => this.products = prods
    );
  }

  save() {

    if ( this.productEdit ) {
      this.productService.update(
        {
          name: this.productForm.controls.productName.value,
          description: this.productForm.controls.productDescription.value,
          price: this.productForm.controls.productPrice.value,
          linkProduct: this.productForm.controls.productLinkProduct.value,
          linkImg: this.productForm.controls.productLinkImg.value,
          _id: this.productEdit._id
        }
      ).subscribe(
        (prod) => {
          this.notify('Atualizado');
        },
        (err) => {
          this.notify('Erro');
          console.error(err);
        }
      );
    } else {
      this.productService.add(
        {
          name: this.productForm.controls.productName.value,
          description: this.productForm.controls.productDescription.value,
          price: this.productForm.controls.productPrice.value,
          linkProduct: this.productForm.controls.productLinkProduct.value,
          linkImg: this.productForm.controls.productLinkImg.value
        }
      ).subscribe(
        (product) => {
          console.log(product);
          this.clearFields();
          this.notify('Adicionado');
        },
        (err) => console.error(err)
      );
    }
  }

  edit(prod: Product) {
    //this.productName = prod.name;
    this.productEdit = prod;
  }

  delete(prod: Product) {
    this.productService.del(prod)
      .subscribe(
        () => this.notify('Removido!'),
        (err) => console.log(err)
      );
  }

  cancel() {
    //to do
  }

  clearFields() {
    this.productForm.controls.productName.setValue('');
    this.productForm.controls.productDescription.setValue('');
    this.productForm.controls.productPrice.setValue(0);
    this.productForm.controls.productLinkProduct.setValue('');
    this.productForm.controls.productLinkImg.setValue('');
    this.productEdit = null;
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 3000});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
