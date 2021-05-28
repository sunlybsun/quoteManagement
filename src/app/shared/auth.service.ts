import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public baseURL:string="http://www.taskquote.com";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     'Authorization':'Bearer '+this.loginService.getToken()

    })
  };

  getQuotes(){

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'Authorization':'Bearer '+this.loginService.getToken()
      })
    };


    return this.http.get(this.baseURL + "/quote",this.httpOptions);
  }

  getQuoteByid(id:number){
    //console.log(Task.QuoteID);
    return this.http.get(this.baseURL + "/quote/" + id,this.httpOptions);
  }

  addQuote(quote:any){
    let body = JSON.stringify(quote);
    //console.log(body);

    return this.http.post(this.baseURL + "/quote", body, this.httpOptions);
  }

  updateQuote(quote:any){

    let body = JSON.stringify(quote);
    //console.log(body);

    return this.http.put(this.baseURL + "/quote/" + quote.QuoteID, body,this.httpOptions);
  }

  deleteQuote(quote:any){

    return this.http.delete(this.baseURL + "/quote/" + quote.QuoteID,this.httpOptions)
  }

}
