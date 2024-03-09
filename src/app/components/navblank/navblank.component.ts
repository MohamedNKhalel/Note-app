import { Component, ElementRef, HostListener, Renderer2, ViewChild, asNativeElements } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navblank',
  templateUrl: './navblank.component.html',
  styleUrls: ['./navblank.component.scss']
})
export class NavblankComponent {
  
  constructor(private _AuthService:AuthService,private _Router:Router , private _Renderer2:Renderer2){}

  @ViewChild('navBar') navElement!:ElementRef

  @HostListener('window:scroll')
  onScroll(){
    console.log(scrollY);
    
    if(window.scrollY > 100){
      this._Renderer2.addClass(this.navElement.nativeElement ,'shadow')

    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
    }
  }
  logOut(){
    this._AuthService.logOut()
    this._Router.navigate(['\login'])
  }
}
