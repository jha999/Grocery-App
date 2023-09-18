import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-landing-page',
  templateUrl: './product-landing-page.component.html',
  styleUrls: ['./product-landing-page.component.css']
})
export class ProductLandingPageComponent implements OnInit{
  
  dropdownForm: FormGroup;
  selectedOption: FormControl;
  // Token : any ;

  constructor(private  getProduct : GroceryService , private router: Router){
    this.selectedOption = new FormControl('');
    this.dropdownForm = new FormGroup({
      selectedOption: this.selectedOption
    });
    console.log("type of ",this.selectedOption);

    const username = sessionStorage.getItem('username');
    if (username) {
      const userData = JSON.parse(username);
      this.email = userData.email;
    }

    
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
  }
  
  email : any;
  
  route = "getproduct"

  collection:any = []
  
  answer : any;

  selectedColor : any ;

  deleting : any;
  
  onSearchKeyPress(event: any) {
    console.log("before loop",event);
    this.collection.forEach((element : any) => {
      if (element.product_Name == event)
      {
        console.log("my event",event);
        
        this.answer = event;
        this.searchProducts(this.answer);
      }
    });
  }
  
  CateogorySelect(event: Event): void {
    let target = event.target as HTMLSelectElement;
    this.selectedColor = target.value;
    console.log("Val",this.selectedColor);
    // console.log("values",this.collection);
    this.sortProducts(this.selectedColor);
    setTimeout(() => {
      this.refreshpage(); 
    },5000);
  }

  ngOnInit(): void {
   this.getProduct.getproduct(this.route).subscribe((result : any)=>{
      console.warn("get product call",result)
      this.collection = result;
      // console.log("collection data",this.collection);
      console.log("product name",typeof(this.collection)); 
  })
 }
  deleteStudent(id : any){
    this.deleting = true;
    console.log("my delete id is", id);
    this.getProduct.deleteProduct(id).subscribe((answer) => {
      console.warn("Delete function", answer);
      window.location.reload();
    })
  }
  
  searchProducts(data : any) {
    this.collection.forEach((object : any) => {
      if (data == object.product_Name)
      {
        this.collection.splice(0, this.collection.length)
        // console.log("collection",object);
        this.collection.push(object);
      }
    });
  }

  sortCollection : any = []
  
  sortProducts(sortdata : any){
    this.collection.forEach((object : any) => {
      if (sortdata == object.product_Category)
      {
        this.sortCollection.push(object)
        // console.log("sortCollection",this.sortCollection);
      }
    });
    this.collection.splice(0, this.collection.length)
    this.collection = this.sortCollection;
    console.log(this.collection);
  }



  refreshpage() {
    window.location.reload();
  }

}
