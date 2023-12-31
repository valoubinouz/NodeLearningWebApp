import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public courses: any;
  public lastCourses: any;

  constructor(
    private http: HttpClient
  ) {  }

  ngOnInit(): void {
    this.getSummariesCourses();
  }

  getSummariesCourses() {
    this.http.get('http://localhost:3000/api/courses-summary').subscribe((res)=>{
      this.courses = res;
      this.lastCourses = this.courses.slice(-4);
      this.courses.sort((a: any, b: any) => a.title.localeCompare(b.title));
    },(err)=>{
      console.log("API error",err);
    })
  }

}
