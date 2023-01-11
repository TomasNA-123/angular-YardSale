import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService
  ){

  }

  ngOnInit(): void {
    this.loadMore()
    /*this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
      console.log(data);
    });*/
  }

  loadMore(){
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
      console.log(data);
    });
  }

}
