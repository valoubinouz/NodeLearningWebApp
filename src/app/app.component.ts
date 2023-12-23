import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'DirectProf';

  constructor(private appService: AppServiceService) { }

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.appService.getData().subscribe((res)=>{
      console.log("API response",res);
    },(err)=>{
      console.log("API error",err);
    })
  }
}
