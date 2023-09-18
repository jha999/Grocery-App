import { Component , OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms'
import { GroceryService } from '../grocery.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  SigninUser = new FormGroup({
    email : new FormControl('',[Validators.required]),
    Password : new FormControl('',[Validators.required])
  })
  route = "signin"

  collection : any = []

  constructor(private login : GroceryService , private navrouter : Router) {}

  ngOnInit(): void {
  }
  LoginUser(){ 
    this.login.loginUser(this.SigninUser.value , this.route).subscribe((result : any)=>{
      this.collection = result;
      sessionStorage.setItem('username', JSON.stringify(this.collection));
      localStorage.setItem('token' , result.token);
      // sessionStorage.setItem('')
      // console.log("collec type login ",typeof(this.collection)); 
      
      console.warn("result is here",result);  
      if(this.collection.email != null)
      {
       this.SigninUser.reset();
      //  console.log("inside if",this.collection);
       this.navrouter.navigate(['/']);
      }
    })
  }
}
