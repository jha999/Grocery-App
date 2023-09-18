import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProductLandingPageComponent } from './product-landing-page/product-landing-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProductLandingPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDetailPageComponent,
    AddToCartComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
