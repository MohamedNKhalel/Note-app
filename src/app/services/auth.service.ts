import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataVar:BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient) { }

  registerApi(regData:any):Observable<any>
  {
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,regData)
  }
  loginApi(logData:any):Observable<any>
  {
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,logData)
  }
  getUserData(){
    this.userDataVar.next(localStorage.getItem('userToken'))
    this.userDataVar.next(jwtDecode(this.userDataVar.getValue()))
    console.log(this.userDataVar);
    
  }
  logOut(){
    localStorage.removeItem('userToken');
  }
}
