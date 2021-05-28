import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-show-data-detail',
  templateUrl: './show-data-detail.component.html',
  styleUrls: ['./show-data-detail.component.scss']
})
export class ShowDataDetailComponent implements OnInit {

  quoteId!:number;
  dataResult:any;

  quote ={
    "QuoteID":"",
    "QuoteType":"",
    "Contact":"",
    "Task":"",
    "DueDate":"",
    "TaskType":"",
  }

  constructor(
    private service:AuthService,
    private activateroute:ActivatedRoute,
    private loginService:LoginService,
    private router: Router,
    //private modalService: NgbModal
  ) { }



  ngOnInit(): void {
    if(this.activateroute.snapshot.paramMap.has('id')){
      this.quoteId = +this.activateroute.snapshot.paramMap.get("id")!;

      this.service.getQuoteByid(this.quoteId)
      .subscribe(data => {
        //console.log(response)
        this.dataResult=data;
        this.quote = {...this.dataResult};
        console.log(this.quote);

      });
    }



  }


  // displayDetail(quote:any){
  //   this.isLoading = true;

  //   this.service.getQuoteByid(quote).subscribe((data)=>{
  //     this.isLoading = false
  //   })

  // }

}
