import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo : 'home'},
  {path: "home", component : HomeComponent },
  {path: "login", component : LoginComponent },
  {path: "register", component : RegisterComponent },
  {path: "product-detail/:id", component:ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
