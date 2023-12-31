import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'DirectProf';

  constructor() { }

  ngOnInit() {
  }

  // getDataFromApi() {
  //   this.appService.getData().subscribe((res)=>{
  //   },(err)=>{
  //     console.log("API error",err);
  //   })
  // }
}
