import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  public courses: any;
  public id: any;
  public category: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCourses();
    this.getCategory();
    }

  getCourses() {
    this.http.get('http://localhost:3000/api/courses-category/'+this.id).subscribe((res)=>{
      this.courses = res;
    },(err)=>{
      console.log("API error",err);
    })
  }

  getCategory() {
    this.http.get('http://localhost:3000/api/category/'+this.id).subscribe((res)=>{
      this.category = res;
    },(err)=>{
      console.log("API error",err);
    })
  }

}
