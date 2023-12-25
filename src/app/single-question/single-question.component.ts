import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {
  public id: any;
  public questions: any;
  public currentQuestionIndex: number = 0;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuestions();
  }

  getQuestions() {
    this.http.get('http://localhost:3000/api/questions-course/'+this.id).subscribe((res)=>{
      this.questions = res;
    },()=>{
      this.questions = null;
    })
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

}
