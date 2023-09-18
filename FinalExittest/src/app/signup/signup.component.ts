import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , FormControl , Validators , AbstractControl} from '@angular/forms';
import {GroceryService} from '../grocery.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  addUser = new FormGroup({
    FullName : new FormControl(''),
    email : new FormControl(''),
    PhoneNumber : new FormControl(null ,[Validators.required]),
    Password : new FormControl(''),
    ConfirmPassword : new FormControl('')
  })
   
  collection : any = []

  route = "signup"
  constructor(private user:GroceryService , private loginrouter : Router) {}

  ngOnInit(): void {
  }
  
  CollectUser(){ 
    if(this.requiredCheck()) {
      var field = this.addUser.get('PhoneNumber') as FormControl;
      field.markAsTouched();
    }
    if (this.addUser.valid)
    {
      console.log("success",this.addUser);
    }
    else {
      console.log("fail");
      this.addUser?.markAsTouched();
      console.log("add user val",this.addUser);
      
    }
    this.user.saveUser(this.addUser.value , this.route).subscribe((result)=>{
      console.warn("result is here",result)
      this.collection = result;
      if(this.collection != null)
      {
        this.addUser.reset()
        this.loginrouter.navigate(['/']);   
      }
      
    })
    // this.addUser.reset()
    // this.loginrouter.navigate(['/login']);
  }
  requiredCheck(){
    const validator = this.addUser.get('PhoneNumber')?.hasValidator(Validators.required);
    console.log(validator);
    if (validator) {
      return true;
    }
    return false;
  }

  get valPhone(){
    return this.addUser.get("PhoneNumber") as FormControl;
 }
}


