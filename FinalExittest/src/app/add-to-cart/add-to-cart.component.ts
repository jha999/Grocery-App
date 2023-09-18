import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']

})
export class AddToCartComponent implements OnInit {

  addCartdata: any = []

  receivedData: any = [];

  Uniqueidfetch: any = []

  route = "getproduct"

  cartroute = "getcartorder"

  answer: any

  placeorder: any = []

  isChecked: boolean;

  showAlert :boolean = false;

  constructor(private service: GroceryService, private router: Router) {
    // this.receivedData = this.service.cartdata;
    // console.log("recieved data",this.receivedData);
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
  }

  ngOnInit(): void {
    this.placeorder.splice(0,this.placeorder.length)
    console.log("bool check", this.isChecked);
    
    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;

    console.log("email is", email);
    
    setTimeout(() => {
      this.service.getcartproduct(this.cartroute).subscribe((result: any) => {
        console.log("cart data", result);
  
        //this.placeorder = result;
        console.log("place order details", this.placeorder);
        result.forEach((element: any) => {
          if (email === element.userEmail && !element.isOrderConfirmed ) {
            this.placeorder.push(element);
            // console.log("id check",element.productId);
            this.pushUniqueValue(element.productId, element.orderQuantity);
          }
        });
        const keyValuePairs = this.Uniqueidfetch.map((key: any, index: any) => [key, this.receivedData[index]]);
        this.answer = Object.fromEntries(keyValuePairs);
        console.log("check key val", this.answer);
      })
      
    }, 500);
   
    setTimeout(() => {
      this.service.getproduct(this.route).subscribe((result: any) => {
        console.warn("get product call", result)
        result.forEach((object: any) => {
          for (let index = 0; index < this.Uniqueidfetch.length; index++) {
            if (this.Uniqueidfetch[index] == object.id) {
              this.addCartdata.push(object);
            }
          }
        });
      })
      
    }, 800);
    
    console.log("cart data count ",this.addCartdata);
  }
  
  pushUniqueValue(idval: any, quantityVal: any) {
    // console.log("val check", idval);
    // console.log("quant check",quantityVal);
    // this.Uniqueidfetch.splice(0 , this.Uniqueidfetch.length)
    if (!this.Uniqueidfetch.includes(idval)) {
      this.Uniqueidfetch.push(idval);
      this.receivedData.push(quantityVal);
      console.log("Added to the uniqueArray.", idval, "Added to the uniquequant.", quantityVal);
    } else {
      console.log("already exists in the uniqueArray.", idval, "already exists in the uniquequnat."), quantityVal;
    }
  }

  incrementQuantity() {
    this.addCartdata.forEach((object: any) => {
      console.log("log obj data", object);
      console.log("answer check", this.answer);
      console.log(Object.keys(this.answer));
      for (const key of Object.keys(this.answer)) {
        console.log("only key", key);
        if (object.id == key) {
          if (object.available_Quantity > this.answer[key]) {
            // console.log(object);
            // this.quantity++;
            this.answer[key]++;
            console.log("values quant", this.answer[object.id]);
          }
        }
      }

    });
  }

  decrementQuantity() {
    this.addCartdata.forEach((object: any) => {
      for (const key of Object.keys(this.answer)) {
        console.log("only key", key);
        if (object.id == key) {
          if (this.answer[key] > 0) {
            this.answer[key]--;
            console.log("dec quant", this.answer[object.id]);
          }
        }
      }
    });
  }

  PlaceOrder(id: any) {
    const requestBody = {
      id: id,
      isOrderConfirmed: true
    }
    this.service.updatecart(requestBody).subscribe((result: any) => {
      console.log("after update", result);
      this.showAlert = !this.showAlert;
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
