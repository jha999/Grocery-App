import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  route = "getcartorder"

  productroute = "getproduct"

  CartOrdercollection : any =[]

  productCollection : any =[]

  resultant : any = []

  constructor(private getCart : GroceryService ) {

  }

  

  ngOnInit(): void {
    
    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;

    setTimeout(() => {
      this.getCart.getcartproduct(this.route).subscribe((result : any) =>{
        console.log("cart data", result);
        result.forEach((element : any) => {
          if (element.isOrderConfirmed && element.userEmail == email)
          {
            this.CartOrdercollection.push(element);
          }
        });
                  
      });
      
    }, 500);

   

    // console.log("cart order collection",this.CartOrdercollection);

    setTimeout(() => {
      this.getCart.getproduct(this.productroute).subscribe((result : any) =>{
        console.log("get product",result);
        result.forEach((element : any) => {
          this.CartOrdercollection.forEach((object : any) => {
              if(object.productId == element.id)
              {
                this.productCollection.push(element);
              }
          });
        });
      },);
      
    }, 800);
   
    
    

    setTimeout(()=>{
      
      for (let index = 0; index < this.productCollection.length; index++) {
        console.log("product collection",this.productCollection);
        for (let x = 0; x < this.CartOrdercollection.length; x++) {
          console.log("cart order collection",this.CartOrdercollection);
            if (this.productCollection[index].id == this.CartOrdercollection[x].productId)
            {
              this.resultant.push({
                product_Name : this.productCollection[index].product_Name,
                image : this.productCollection[index].image,
                available_Price : this.productCollection[index].available_Price,
                orderQuantity : this.CartOrdercollection[x].orderQuantity
              })
            }
        }  
      }
      console.log("answer",this.resultant);
    },1000)

    // for (let index = 0; index < this.productCollection.length; index++) {
    //   for (let x = 0; x < this.CartOrdercollection.length; x++) {
    //     console.log("cart order collection",this.CartOrdercollection);
    //       if (this.productCollection[index].id == this.CartOrdercollection[x].productId)
    //       {
    //         resultant.push({
    //           product_Name : this.productCollection[index].product_Name,
    //           image : this.productCollection[index].image,
    //           available_Price : this.productCollection[index].available_Price,
    //           orderQuantity : this.CartOrdercollection[x].orderQuantity
    //         })
    //       }
    //   }  
    // }
  
    // console.log("cart order collection",this.CartOrdercollection);

    console.log("my obj",this.productCollection);

    // console.log("my resultant array",resultant);
  }
}
