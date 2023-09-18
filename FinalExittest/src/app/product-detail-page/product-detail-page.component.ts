import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { ActivatedRoute } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
  // template : `<button (click)="sendData()">Send Data</button>`
})
export class ProductDetailPageComponent implements OnInit {

  recievedcollectiondata: any = []

  route = "getproduct"

  quantity : any = 0;

  icon = faCartShopping;

  isLoggedin : any ;

  email : any;

  postCartCollectionId : any ;

  cart = "addcart"

  // Token : any

  constructor(private service: GroceryService, private router: ActivatedRoute) { 
    this.isLoggedin= sessionStorage.getItem('username')!=null;
    console.log("login",this.isLoggedin);
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
   
    if (this.isLoggedin)
    {
    const sessionData = sessionStorage.getItem('username');

    const parsedData = JSON.parse(sessionData);
     
    this.email = parsedData.email;
    }

  }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    console.log("cid", id)
    this.service.getproduct(this.route).subscribe((result: any) => {
      console.warn("get product call", result)
      result.forEach((object: any) => {
        if (id == object.id) {
          this.recievedcollectiondata.push(object);
        }
      });
      console.log("revieced collection data", this.recievedcollectiondata);
    })
  }

  incrementQuantity() {
     this.recievedcollectiondata.forEach((object : any) => {
       if (object.available_Quantity > this.quantity)
       {
         console.log(object);
         this.quantity++; 
         console.log("values quant",this.quantity);   
       }
     });  
  }
  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      console.log("dec quant", this.quantity);
    }
  }

  sendData() {
    console.log("data order",this.recievedcollectiondata);
    this.service.cartdata = this.quantity;
    
    this.recievedcollectiondata.forEach((object : any) => {
       console.log("data is ",object);
       this.postCartCollectionId = object.id;
    });
    
    const requestBody = {
      ProductId : this.postCartCollectionId,
      UserEmail: this.email,
      OrderQuantity :this.quantity,
      isOrderConfirmed : false
    }
    console.log("my body",requestBody);
    
    console.log("sender function",this.service.cartdata);
    
    this.service.saveCart(requestBody, this.cart).subscribe((result : any)=>{
      
      console.warn("add cart result",result)
      
    })
  }
}
