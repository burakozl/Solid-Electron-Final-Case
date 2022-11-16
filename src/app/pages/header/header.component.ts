import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductsService } from 'src/app/services/products.service';
import { SearchTextService } from 'src/app/services/search-text.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText:string = '';//ngmodel ile inputdan alınacak değeri bu deşikene atar...
  isLogin!:boolean;
  userName:string = '';
  cartItems!:Product[];
  totalPrice!:number;

  constructor(
    private searchTextService:SearchTextService,//oluşturulan servis'e yakaladığı değeri göndericek...
    private localStorageService:LocalStorageService,
    private router:Router,
    private productService:ProductsService
    ) { }

  ngOnInit(): void {
    this.localStorageServiceProcess();
    this.searchTextService.sendData(this.searchText);//observable aracılığıyla subscribers'lara text'i gönder
    this.onSearchTextChanged();//bu metot ile her değişiklik olduğunda yakalaya bilmek için html tarafında input eventi ile ilgili inputu yalayıp tekrar service içersindeki sendData metoduna gönderir...
    this.productService.shopingCartModel$.subscribe((res) => {
      this.cartItems = res;
      this.totalPrice = 0;
      this.cartItems.forEach((item) => {
        this.totalPrice += item.price;
      })
    });
  }

  localStorageServiceProcess() {
    if(Boolean(this.localStorageService.get('isLogin')) === true){//localstorageDa islogin value değeri true ise..
      this.isLogin = Boolean(this.localStorageService.get('isLogin'));//oluşturulan değişkene değeri ata...
    }
    if(this.localStorageService.get('userName') !== ''){//localstorageDa username value değeri boş değilse
      this.userName = String(this.localStorageService.get('userName'));//oluşturulan değişkene ata...
    }

    this.localStorageService.isUserLoggedIn.subscribe((res) => {
      this.isLogin = res;
    });//ilgili serviste bulunan değere subscribe olunup güncel değer atanır....

    this.localStorageService.userName.subscribe((res) => {
    this.userName = res;
    });//ilgili serviste bulunan değere subscribe olunup güncel değer atanır....
  }

  onSearchTextChanged() {//input değeri değiştiğinde bu metot çağrılır..
    this.searchTextService.sendData(this.searchText);//değişiklik servisteki sendData metoduna gönderilir...
  }

  login(){//navbarda bulunnan giriş yap butonu burayı teikler...
    this.router.navigateByUrl('/login');//login page yönlendir..
  }
  logout(){//navbarda bulunnan dropdown içersindeki çıkış yap butonu burayı teikler...
    this.localStorageService.logout();//servis içersinde subject değerleri next ile güncellenir...
    this.router.navigateByUrl('/login');//login page yönlendir...
  }

}
