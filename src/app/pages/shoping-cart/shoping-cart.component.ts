import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
<<<<<<< HEAD

=======
  // quantity: number[] = [];
>>>>>>> 3d1c17cfeae5d4aaac43b2a4ef1d1fe2b5ee1ad7
  constructor(
    private productService:ProductsService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.shopingCartModel$.subscribe((res) => {
      this.cartItems = res;
      this.totalPrice = 0;
<<<<<<< HEAD
      this.cartItems.forEach((item:any) => {
        this.totalPrice += item.totalPrice;
      });
=======
      this.cartItems.forEach((item) => {
        this.totalPrice += item.price;
>>>>>>> 3d1c17cfeae5d4aaac43b2a4ef1d1fe2b5ee1ad7
    });
    });
  }
  // onValueChange(quantityValue:number){
  //   this.totalPrice = 0;
  //   this.cartItems.forEach((item) => {
  //     this.totalPrice += (item.price * quantityValue);
  //   });
  //   console.log(this.totalPrice);
  // }
  completeOrder(){
    if(this.cartItems.length > 0){
      this.router.navigateByUrl('/complete-order');
    }else{
      this.toastr.info("Siparişi tamamlamak için sepete bişeyler ekle...")
    }
  }
  // onValueChange(index:number,quantityValue:number){
  //   this.totalPrice = 0;
  //   this.cartItems.forEach((item) => {
  //     if(index === (item.id))  this.totalPrice += (item.price * quantityValue);

  //   });
  //   console.log(this.totalPrice);
  // }
  completeOrder(){
    if(this.cartItems.length > 0){
      this.router.navigateByUrl('/complete-order');
    }else{
      this.toastr.info("Siparişi tamamlamak için sepete bişeyler ekle...")
    }
  }

}
