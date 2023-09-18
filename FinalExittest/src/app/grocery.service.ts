import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  urlacc = "https://localhost:44389/api/account"
  urlpro = "https://localhost:44389/api/product"
  urlcart = "https://localhost:44389/api/order"

  collection : any = [];

  cartdata : any ;

  // headers = new HttpHeaders()
  //   .set("Authorization" , `Bearer ${localStorage.getItem('token')}`)

  // private authToken = localStorage.getItem('token');

  constructor(private http : HttpClient) { }

  saveUser(data:any , signup:any){
    console.log("data is",data)
    // console.log(typeof(data))
    return this.http.post(`${this.urlacc}/${signup}`,data)
  }
  loginUser(data : any , signin:any){
    console.log("log in data",data);
    return this.http.post(`${this.urlacc}/${signin}`,data)
  }

  addproducts(data : any , addproduct : any ){
    console.log("my auth toke",localStorage.getItem('token'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("product headers is"+ headers);
    return this.http.post(`${this.urlpro}/${addproduct}`,data , {headers})
  }

  getproduct(getproduct : any ){ 
    this.collection = this.http.get(`${this.urlpro}/${getproduct}`)
    // console.log("data from backend is",this.collection);
    return this.collection;
  }
  
  updateproduct(data : any , route : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlpro}/${route}`,data , {headers})
  }
  
  deleteProduct(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.delete(`https://localhost:44389/api/product/deleteproduct/${id}` , {headers})
  }

  saveCart(data:any , addcart : any){
    console.log("cart data",this.cartdata);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    // console.log(typeof(data))
    return this.http.post(`${this.urlcart}/${addcart}`,data , {headers})
  }

  getcartproduct(getcartproduct : any ){ 
    this.collection = this.http.get(`${this.urlcart}/${getcartproduct}`)
    // console.log("data from backend is",this.collection);
    return this.collection;
  }

  updatecart(data : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlcart}/editcart`,data , {headers})
  }

}
