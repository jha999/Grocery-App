import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProduct = new FormGroup({
    Product_Name: new FormControl(''),
    Product_Description: new FormControl(''),
    Product_Category: new FormControl(''),
    Available_Quantity: new FormControl(''),
    Available_Discount: new FormControl(''),
    Image: new FormControl(''),
    Available_Price: new FormControl(''),
    Specification: new FormControl('')
  })

  collection: any = []

  route = "addproduct"



  constructor(private product: GroceryService, private loginrouter: Router) { }

  ngOnInit(): void { }

  AddProduct() {
    this.product.addproducts(this.addProduct.value, this.route).subscribe((result) => {
      console.warn("result is here", result)
      this.collection = result
      // sessionStorage.setItem('token',result.token)
      console.log("collection values", this.collection)
      if (this.collection != null) {
        this.addProduct.reset();
        this.loginrouter.navigate(['/']);
      }
    })
    // this.addProduct.reset();

    // this.loginrouter.navigate(['/']);
  }
}
