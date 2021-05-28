import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LoginService} from './shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quoteManagement';


  constructor(public service:LoginService,private router:Router){


  }

  ngOnInit(){

  }


  logOut(){
    this.service.removeToken();
    this.service.isAuth = false;
    //this.router.navigate(["login"])

  }
}
