import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/auth.service';
import { LoginService } from '../shared/login.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';




@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowDataComponent implements OnInit,AfterViewInit {

  @ViewChild('select') select!:ElementRef;
  @ViewChild('order') order!:ElementRef;
  @ViewChild(MatSort,{ static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('orderCheck') orderCheck!:ElementRef;
  @ViewChild('input') input!:ElementRef;

  quotes:any;

  quote ={
    "QuoteID":"",
    "QuoteType":"",
    "Contact":"",
    "Task":"",
    "DueDate":"",
    "TaskType":"",
  }

  choices:string[] = [
    '5',
    '10',
    '20',
    '50',
  ]

  orders:string[]=[
    'QuoteType',
    'QuoteID',
    'Contact',
    'Task',
    'DueDate',
    'TaskType',

  ]

  displayedColumns: string[] = ['QuoteType', 'QuoteID', 'Contact', 'Task','DueDate','TaskType','option'];
  dataSource:any;
  isLoading:boolean=false;
  spinnerColor:ThemePalette="warn";

  by!:string;
  sortedData:any;

  // postsPerPage = 2;
  // currentPage = 1;
   pageSizeOptions = [5, 10, 20, 50];

  constructor(private service:AuthService,
    private activateroute:ActivatedRoute,
    private loginService:LoginService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {


    this.getQuotes();
    //console.log(localStorage.getItem("token"));

  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
              tap(()=>
              {
                let value = this.input.nativeElement.value;
                this.dataSource.filter = value.trim().toLocaleLowerCase();
              })

            )
            .subscribe();


              //this.dataSource.filter = result.KeyboardEvent.key;

  }



  getQuotes(){
    this.isLoading = true;

    this.service.getQuotes().subscribe((data) => {
      this.isLoading = false
      console.log(data);
      this.quotes = data;
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  addQuote(quote:any){

    console.log(quote.value);
    this.service.addQuote(quote.value).subscribe(data=>{
      this.getQuotes();
      quote.reset()
    });
  }


  deleteMyQuote(quote:any){
    console.log(quote)
    this.service.deleteQuote(quote).subscribe(data=>{
      this.getQuotes();
    })
  }

  updateQuote(quote:any){
    console.log(quote)
    this.service.updateQuote(quote).subscribe(data=>{

      this.getQuotes();
    })
  }


  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openUpdate(content:any,quote:any){

    this.quote = quote;
    console.log(this.quote);
    this.modalService.open(content, { size: 'lg' });
  }

  openDelete(content:any,quote:any){
    this.quote = quote;
    this.modalService.open(content, { centered: true });


  }

  display(){
    this.isLoading = true;

    this.service.getQuotes().subscribe((data) => {
      this.isLoading = false
      this.quotes = data;
      this.quotes = this.quotes.slice(0,this.select.nativeElement.value);
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }

  displayDetail(quote:any){
    // console.log(quote);
    // console.log(quote.QuoteID);
    this.router.navigate([`showdata/${quote.QuoteID}`])

  }


  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    // this.currentPage = pageData.pageIndex + 1;
    // this.postsPerPage = pageData.pageSize;

    this.service.getQuotes().subscribe((data) => {
      this.isLoading = false
      this.quotes = data;
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }

  // public doFilter = (e: any) => {
  //   console.log("filterTest")
  //   let value = e.target.value;
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  // }




  sortDataBySelect(){

    this.quotes.sort((a:any, b:any) => {
      let isAsc;
    if(this.orderCheck.nativeElement.checked){
      isAsc = false
    }else(
      isAsc = true
    )

    switch(this.order.nativeElement.value){
      case 'QuoteID': return compare(a.QuoteID, b.QuoteID, isAsc);
        case 'QuoteType': return compare(a.QuoteType, b.QuoteType, isAsc);
        case 'Contact': return compare(a.Contact, b.Contact, isAsc);
        case 'Task': return compare(a.Task, b.Task, isAsc);
        case 'DueDate': return compare(a.DueDate, b.DueDate, isAsc);
        case 'TaskType': return compare(a.TaskType, b.TaskType, isAsc);
        default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.quotes);
  this.dataSource.paginator = this.paginator;
  console.log('sortselectest')

  }




  sortData(sort: Sort) {

    const data = this.quotes.slice();
    console.log(data)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;


    }else{
      this.sortedData=data.sort((a:any, b:any) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'QuoteID': return compare(a.QuoteID, b.QuoteID, isAsc);
          case 'QuoteType': return compare(a.QuoteType, b.QuoteType, isAsc);
          case 'Contact': return compare(a.Contact, b.Contact, isAsc);
          case 'Task': return compare(a.Task, b.Task, isAsc);
          case 'DueDate': return compare(a.DueDate, b.DueDate, isAsc);
          case 'TaskType': return compare(a.TaskType, b.TaskType, isAsc);
          default: return 0;
        }
      });
    }
    this.dataSource = new MatTableDataSource(this.sortedData);
    this.dataSource.paginator = this.paginator;
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

