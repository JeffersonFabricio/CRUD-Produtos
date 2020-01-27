import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName = '';
  productDescription = '';
  productPrice: number;
  productUnit = '';
  productLinkProduct = '';
  productLinkImg = '';
  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.get().subscribe(
      (prods) => this.products = prods
    );
  }

  save() {
    this.productService.add(
      {
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        unit: this.productUnit,
        linkProduct: this.productLinkProduct,
        linkImg: this.productLinkImg
      }
    ).subscribe(
      (product) => {
        console.log(product);
        this.clearFields();
      },
      (err) => console.error(err)
    );
  }

  edit(prod: Product) {
    //to do
  }

  delete(prod: Product) {
    //to do
  }

  cancel() {
    //to do
  }

  clearFields() {
    this.productName = '';
    this.productDescription = '';
    this.productUnit = '';
    this.productLinkProduct = '';
    this.productLinkImg = '';
  }



}
