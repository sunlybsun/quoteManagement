import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuth!:boolean;



  public baseURL:string="http://www.taskquote.com";

  constructor(private http: HttpClient) {
    if(this.getToken()){
      this.isAuth = true;

    }else{
      this.isAuth = false;
    }

  }

  httpRegisterOption = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json'})
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
  };


  register(user:any){
    console.log(user)
    let body = JSON.stringify(user);
    //console.log(body);
    //body = JSON.parse(body);
    return this.http.post(this.baseURL + "/Account/Register", body,this.httpRegisterOption);

  }

  ValidateUser(user:any){

    var userData = "username=" + user.username + "&password=" + user.password + "&grant_type=password";
    console.log(userData);
    return this.http.post(this.baseURL+'/token',userData,this.httpOptions);

    //return this.http.post("https://localhost:44360/token",userData,this.httpOptions);
  }

  storeToken(token:string){
    localStorage.setItem("token",token);

  }

  getToken(){
    //return this.token.next(localStorage.getItem("token"))
    return localStorage.getItem("token");


  }

  removeToken() {
    return localStorage.removeItem("token");
  }









}
