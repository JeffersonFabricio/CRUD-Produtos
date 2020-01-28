import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName = '';
  productDescription = '';
  productPrice: number;
  productLinkProduct = '';
  productLinkImg = '';
  products: Product[] = [];

  productEdit: Product = null;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.get().subscribe(
      (prods) => this.products = prods
    );
  }

  save() {

    if ( this.productEdit ) {
      this.productService.update(
        {
          name: this.productName,
          description: this.productDescription,
          price: this.productPrice,
          linkProduct: this.productLinkProduct,
          linkImg: this.productLinkImg,
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
          name: this.productName,
          description: this.productDescription,
          price: this.productPrice,
          linkProduct: this.productLinkProduct,
          linkImg: this.productLinkImg
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
    this.productName = prod.name;
    this.productEdit = prod;
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
    this.productLinkProduct = '';
    this.productLinkImg = '';
    this.productEdit = null;
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 3000});
  }

}
