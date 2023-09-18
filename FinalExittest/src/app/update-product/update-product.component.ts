import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProduct = new FormGroup({
    id : new FormControl(''),
    Product_Name : new FormControl(''),
    Product_Description : new FormControl(''),
    Product_Category : new FormControl(''),
    Available_Quantity : new FormControl(''),
    Available_Discount : new FormControl(''),
    Image : new FormControl(''),
    Available_Price : new FormControl(''),
    Specification : new FormControl('')
  })

  collection : any = []

  // Token : any;

  route = "getproduct"
  constructor(private product: GroceryService , private routesnap : ActivatedRoute, private router : Router) {
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
  }
  
  array:any = []

  answer : any;

  ngOnInit(){
    const id = this.routesnap.snapshot.params['id'];
    this.updateProduct.patchValue({
      id: id
    });
    console.log("id check",this.updateProduct);
    
    this.product.getproduct(this.route).subscribe((result : any)=>{
      this.array = result
      console.log("oNint",this.array); 

      for(let data of this.array) {
        if (id == data.id)
        {
          this.answer = data
        }
      }
      console.log("answer is",this.answer);

      this.updateProduct = new FormGroup({
        id : new FormControl(this.answer.id),
        Product_Name : new FormControl(this.answer.product_Name),
        Product_Description : new FormControl(this.answer.product_Description),
        Product_Category : new FormControl(this.answer.product_Category),
        Available_Quantity : new FormControl(this.answer.available_Quantity),
        Available_Discount : new FormControl(this.answer.available_Discount),
        Image : new FormControl(this.answer.image),
        Available_Price : new FormControl(this.answer.available_Price),
        Specification : new FormControl(this.answer.specification)
    })
   })
   
    // console.log("id check", this.updateProduct.value);  
  }

  proroute = "editproduct";

  UpdateProduct(){  
    this.product.updateproduct(this.updateProduct.value , this.proroute).subscribe((result)=>{
      console.warn("result is here",result)
      this.collection = result;
      console.log("check values",this.collection);
      
      if (this.collection != null)
      {
        this.updateProduct.reset();
        this.router.navigate(['/']);
      }
    })
     
  }
}
