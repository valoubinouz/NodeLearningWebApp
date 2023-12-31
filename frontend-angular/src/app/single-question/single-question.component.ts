import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {
  public id: any;
  public questions: any;
  public currentQuestionIndex: number = 0;
  public correctCount: number = 0;
  public incorrectCount: number = 0;
  public quizFinished: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuestions();
  }

  getQuestions() {
    this.http.get('http://localhost:3000/api/questions-course/' + this.id).subscribe((res) => {
      this.questions = res;
    }, () => {
      this.questions = null;
    });
  }

  correct() {
    this.http.put('http://localhost:3000/api/question/' + this.questions[this.currentQuestionIndex].id, {
      success: 1 }).subscribe((res) => {}, () => {});
      this.correctCount++;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finishQuiz();
      }
    }
    
    incorrect() {
    this.http.put('http://localhost:3000/api/question/' + this.questions[this.currentQuestionIndex].id, {
      success: -1 }).subscribe((res) => {}, () => {});
    this.incorrectCount++;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {

      this.finishQuiz();
    }
  }

  hasNextQuestion() {
    return this.currentQuestionIndex < this.questions.length - 1;
  }
  lastQuestion() {
    return (this.currentQuestionIndex == this.questions.length-1) && this.questions.length > 0;
  }

  finishQuiz() {
    this.quizFinished = true;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.quizFinished = false;
  }

  returnQuestions() {
    this.router.navigate(['/course', this.id]);
  }
    
}
