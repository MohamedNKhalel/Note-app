import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navblank',
  templateUrl: './navblank.component.html',
  styleUrls: ['./navblank.component.scss']
})
export class NavblankComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}
  logOut(){
    this._AuthService.logOut()
    this._Router.navigate(['\login'])
  }
}
