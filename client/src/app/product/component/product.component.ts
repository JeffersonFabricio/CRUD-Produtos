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

  constructor() { }

  ngOnInit() {
  }

  save(){
    //to do
  }

  edit(prod: Product){
    //to do
  }

  delete(prod: Product){
    //to do
  }

  cancel(){
    //to do
  }



}
