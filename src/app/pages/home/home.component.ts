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
  subscription!: Subscription;//ilgili service'i dinleyip değişiklikleri yakalamak için rxjs faydalan...

  constructor(
    private productsService:ProductsService,//listelenecek ürünleri service içersindeki get req. ile yakalayacağımız için import et..
    private searchTextService:SearchTextService//search text i yakalayacağımız service import et...
  ) {
    this.subscription = this.searchTextService.getData().subscribe(x => {
      this.searchedTextPassed = x;//service içersinde yakaladığımız değeri oluşturduğumuz değişkene atar. burada subject yardımıyla sürekli dinleme işlemi yapıyoruz..
    });
   }

  ngOnInit(): void {
    this.getProducts();//service'deki get isteği ile ürünleri getir.
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;//gelen ürünler dizisini ilgili değişkene atar...
    });
  }

}
