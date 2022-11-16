import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  cartItems!:Product[];
  totalPrice!:number;
  constructor(
    private productService:ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.shopingCartModel$.subscribe((res) => {
      this.cartItems = res;
      this.totalPrice = 0;
      this.cartItems.forEach((item) => {
        this.totalPrice += item.price
      });
    });
  }

}
