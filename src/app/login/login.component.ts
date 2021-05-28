import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import{LoginService} from '../shared/login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  closeResult!: string;
  errorMessage!:string;


  loginForm!:FormGroup;
  loading:any = false;
  tokenFetch!:any;


  userRegister ={
    UserName:"",
    PassWord:"",
    ConfirmPassword:"",
    Email:""
  }

  constructor(private modalService: NgbModal,public loginService : LoginService,
              private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:  ['', Validators.required],
      password:['',Validators.required],
    });
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }

  registerUser(registerUser:any){
    //console.log(registerUser.value);

    this.userRegister.UserName = registerUser.value.Username;
    this.userRegister.Email = registerUser.value.Email;
    this.userRegister.PassWord = registerUser.value.Password;
    this.userRegister.ConfirmPassword = registerUser.value.Confirmpassword;

    //this.loginService.register(this.userRegister)
    this.loginService.register(this.userRegister)
    // .pipe(
    //   catchError(err =>{
    //     this.errorMessage = err.HttpErrorResponse.error.ModelState[1];
    //     return throwError(err);

    //   }
    // )
    .subscribe((data:any)=>{
        registerUser.reset();
      },
     err => {

       this.errorMessage = err.error.ModelState[""][0];

     }

  )


}

onSubmit(){
  let user = this.loginForm.value;
   this.loginService.ValidateUser(user).subscribe((data)=>
   {
     this.tokenFetch = data;
     console.log(this.tokenFetch);
     this.loginService.storeToken(this.tokenFetch.access_token);
     if(this.tokenFetch.access_token){
       this.loginService.isAuth = true;
     }

   },
   error=>{
     console.log(error.message);
   },
   ()=>{
      //console.log(this.loginService.getToken());

     this.router.navigate(['/showdata']);

   }
   )
}



}
