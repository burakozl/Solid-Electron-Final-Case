import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private controllerUrl = `${environment.apiUrl}/products`;

  constructor(
    private httpClient:HttpClient
  ) { }

  public getProducts(){
    return this.httpClient.get<Product[]>(`${this.controllerUrl}`);
  }
  public getProduct(productId:number){
    return this.httpClient.get<Product>(`${this.controllerUrl}/${productId}`);
  }
}
