import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
    
  }
  errMsg: string = '';
  isClicked: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]/),
    ]),
  });

  loginFunction() {
    this.isClicked = true;
    console.log(this.loginForm.value);
    this._AuthService.loginApi(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        if (data.msg == 'done') {
          localStorage.setItem('userToken', data.token);
          this._Router.navigate(['/home']);
          this.isClicked = false;
          this._AuthService.getUserData();
        }
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.msg;
        this.isClicked = false;
      },
    });
  }
}
