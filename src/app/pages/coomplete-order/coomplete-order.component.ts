import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-coomplete-order',
  templateUrl: './coomplete-order.component.html',
  styleUrls: ['./coomplete-order.component.css']
})
export class CoompleteOrderComponent implements OnInit {

  completeOrderForm!: FormGroup;
  orders!:Product[];

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductsService,
    private localStorageService:LocalStorageService,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.createCompleteOrderForm();
    if(this.localStorageService.get("Orders") === null){
      this.localStorageService.set("Orders",'[]');
    }
  }

  getOrders() {
    this.productService.shopingCartModel$.subscribe((res) => {
      this.orders = res;
      });
  }

  createCompleteOrderForm() {
    this.completeOrderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required,this.noSpaceAllowed]],
      adress: ['',Validators.required],
      city: ['',Validators.required],
      region: ['',Validators.required]
    })
  }
  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true};
    }
    return null;
  }

  takeOrder(){
    let lsOrder:any = localStorage.getItem('Orders');
    let oldOrder = JSON.parse(lsOrder);
    const newOrders:any = {
      productInformation: this.orders.map(item => {
        return {
          id:item.id,
          name: item.name,
          price: item.price,
          imageId: item.imageId
        }
      }),
      ...this.completeOrderForm.value,
    };

    oldOrder.push(newOrders);

    this.localStorageService.set("Orders",JSON.stringify(oldOrder));
    let ls:any = this.localStorageService.get("Orders");
    console.log(JSON.parse(ls));

    this.toastr.success("Siparişiniz alınmıştır...");
    this.productService.deleteProductToStore();
    this.router.navigateByUrl('/customer-orders');
  }
}