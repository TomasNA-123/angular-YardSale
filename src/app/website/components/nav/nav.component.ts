import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from 'src/app/services/store.service';

import { User } from 'src/app/models/user.mode';
import { Category } from 'src/app/models/product.model';

import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  /*@Input() logedUser = {
    id: "",
    name: "",
    email: "",
    password: ""
  };*/

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService : CategoriesService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  login(){
    this.authService.loginAndGet("maria@mail.com", "12345")
    .subscribe(() => {
      this.router.navigate(["/profile"]);
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  logout(){
    this.authService.logOut();
    this.profile = null;
    this.router.navigate(["/home"]);
  }

}
