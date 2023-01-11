import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';

import { HighlightDirective } from './directives/highlight.directive';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe,

    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe,

    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ]
})
export class SharedModule { }
