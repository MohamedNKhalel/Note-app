import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isClicked:boolean=false;
  errMsg:string=''
  eye:boolean =false;
  constructor(private _AuthService:AuthService,private _Router:Router){}
  registerForm:FormGroup= new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(4)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/),Validators.minLength(6)]),
    age: new FormControl(null,[Validators.required,Validators.pattern(/[0-9]{0,2}/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}\s*$/)]),
  })


  toggleEye(){
    return this.eye= !this.eye
  }
  registerFunction(){
    this.isClicked=true
    this._AuthService.registerApi(this.registerForm.value).subscribe({
      next:data=>{
        console.log(data);
        if(data.msg == 'done'){
          this._Router.navigate(['/login'])
          this.isClicked=false
        }
      },
      error:err=>{
        console.log(err);
        this.errMsg=err.error.msg
        this.isClicked=false
      }
    })
  }
}
