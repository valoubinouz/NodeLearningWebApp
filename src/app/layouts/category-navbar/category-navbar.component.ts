import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  public categories: any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getCategories();    
  }

  getCategories() {
    this.http.get('http://localhost:3000/api/categories').subscribe((res)=>{
      this.categories = res;
    },(err)=>{
      console.log("API error",err);
    })
  }


}
