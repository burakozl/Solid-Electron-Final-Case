import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  userName: Subject<string> = new Subject<string>();

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }

  setUserName(name:string){
    if (localStorage.getItem('userName')) {
      localStorage.setItem("userName",name);
      this.userName.next(name);
    }
  }

  login() {
    if (localStorage.getItem('isLogin')) {
      localStorage.setItem("isLogin","true");
      this.isUserLoggedIn.next(true);
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  logout() {
    this.isUserLoggedIn.next(false);
    this.userName.next('');
    localStorage.setItem("isLogin","false");
    localStorage.setItem("userName","");
  }
}
