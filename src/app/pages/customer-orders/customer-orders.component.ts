import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  date:Date = new Date();
  orderNumber!:number;
  customerOrders!:any;
  totalPrice!:number;

  constructor(
    private localStrogeService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.orderNumber = Math.floor(10000000 + Math.random() * 90000000);
    this.getCustomerOrders();
  }

  getCustomerOrders() {
    let orders:any = this.localStrogeService.get('Orders');
    this.customerOrders = JSON.parse(orders);
    console.log(this.customerOrders);
    this.totalPrice = 0;
    this.customerOrders[0].productInformation.forEach((item:any) => {
      this.totalPrice += item.price;
  });
  }

}
