import { Component, EventEmitter, Output, Input } from '@angular/core';
import { switchMap } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Output() iconText = new EventEmitter<string>();

  @Output() loadNext = new EventEmitter<boolean>();

  myShoppingCart: Product[] = [];
  total=0;
  @Input() products: Product[] = [];
  showProductDetail = false;
  productChosen: Product | null = null;

  //limit = 10;
  //offset = 0;

  statusDetail: "loading" | "success" | "error" | "init" = "init";

  constructor(
    private storeService: StoreService,
    private ProductsService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShopingCart();
  }



  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = "loading";
    this.ProductsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.toggleProductDetail();
      this.statusDetail = "success";
    }, errorMsg => {
      window.alert(errorMsg)
      this.statusDetail = "error";
    })
  }

  readAndUpdate(id: string){
    //con dependencias
    this.ProductsService.getProduct(id)
    .pipe(
      switchMap((product) => this.ProductsService.update(product.id, {title: "change"}))
    )
    .subscribe(data => {
      console.log(data);
    });

    //peticiones en paralelo
    this.ProductsService.fetchReadAndUpdate(id, {title: "not callback hell"})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
      console.log(read, update)
    });
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: "Nuevo producto",
      description: "esto es un producto",
      images: [""],
      price: 1000,
      categoryId: 2,
    }
    this.ProductsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct(){
    if(this.productChosen){
      const changes: UpdateProductDTO = {
        title: "new title updated",
        images: ["https://placeimg.com/640/480/any"]
      }
      const id = this.productChosen.id;
      this.ProductsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === id)
        this.products[productIndex] = data;
        this.productChosen = data;
      })
    }
    else{
      alert("No hay productos seleccionados");
    }
  }

  deleteProduct(){
    if(this.productChosen){
      const id = this.productChosen.id;
      this.ProductsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === id)
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
    else{
      alert("No hay productos seleccionados");
    }

  }

  loadMore(){
    this.loadNext.emit(true);
    /*this.ProductsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
    });*/
  }
}
