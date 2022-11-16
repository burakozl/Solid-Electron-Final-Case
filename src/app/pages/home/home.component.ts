import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { SearchTextService } from 'src/app/services/search-text.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products!:Product[];
  searchedTextPassed!: string;
  subscription!: Subscription;

  constructor(
    private productsService:ProductsService,
    private searchTextService:SearchTextService
  ) {
    this.subscription = this.searchTextService.getData().subscribe(x => {
      this.searchedTextPassed = x;
    });
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

}
