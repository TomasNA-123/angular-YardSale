import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { retry, catchError, throwError, map, zip } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { check_time } from '../interceptors/time.interceptor';

import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private Http : HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset != null){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.Http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset != null){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.Http.get<Product[]>(`${this.apiUrl}/products`, {params, context: check_time()})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .14 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: string){
    return this.Http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 500){
          return throwError("Algo falla en el servidor")
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError("El producto no existe")
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError("No estas Autorizado para entrar, LARGO!!1!")
        }
        return throwError("Ups... algo salio mal")
      })
    )
  }

  getProductsByPage(limit: number, offset: number){
    return this.Http.get<Product[]>(`${this.apiUrl}/products`,{params: {limit, offset}});
  }

  create(dto: CreateProductDTO){
    return this.Http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.Http.put<Product>(`${this.apiUrl}/products/${id}`, dto)
  }

  delete(id: string){
    return this.Http.delete<boolean>(`${this.apiUrl}/products/${id}`)
  }

}
