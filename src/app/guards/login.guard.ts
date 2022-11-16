import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private localStrogeService:LocalStorageService,
    private router:Router,
    private toastr:ToastrService
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.localStrogeService.get("isLogin") == 'true'){//localstorage değeri true ise kullanıcı giriş yapmış demektir guard etkisiz
        return true;
      }else{//kullanıcı giriş yapması için logine yönlendirilir ve hata mesajı gösterirlir...guard devrede...
        this.toastr.error("Bu sayfaya erişmek için login olmalısınız...","Hata");
        this.router.navigateByUrl("/login");
        return false;
      }
  }

}
