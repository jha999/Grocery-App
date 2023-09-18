import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent } from './signup/signup.component';
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import {AddProductComponent} from './add-product/add-product.component'
import {UpdateProductComponent} from './update-product/update-product.component'
import {ProductDetailPageComponent} from './product-detail-page/product-detail-page.component'
import {AddToCartComponent} from './add-to-cart/add-to-cart.component'
import {MyOrdersComponent} from './my-orders/my-orders.component'

const routes: Routes = [
  {
   component : HomeComponent,
   path :""
  },
  {
  component : SignupComponent,
  path : "signup"
  },
  {
    component : LoginComponent,
    path : "login"
  },
  {
    component : AddProductComponent,
    path : "addproduct"
  },
  {
    component : UpdateProductComponent,
    path : "updateproduct/:id"
  },
  {
    component : ProductDetailPageComponent,
    path : "viewdetails/:id"
  },
  {
    component : AddToCartComponent,
    path : "addcart"
  },
  {
    component : MyOrdersComponent,
    path : "myorders"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
