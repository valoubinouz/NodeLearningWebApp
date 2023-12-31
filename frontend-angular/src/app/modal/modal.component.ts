import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  course: any | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modalRef: MdbModalRef<ModalComponent>,
    public http : HttpClient,
    ) {
      this.form = this.fb.group({
        question: [''],
        answer: [''],
      });
    }
  
    ngOnInit(): void {}

  create() {
    const question = this.form.get('question')?.value;
    const answer = this.form.get('answer')?.value;
    console.log({ question: question, answer: answer, course: this.course?.id });
    this.http.post('http://localhost:3000/api/question', { question: question, answer: answer, course: this.course?.id }).subscribe(() => {
      this.modalRef.close();
    }, () => {
      this.modalRef.close();
    });

    this.modalRef.close();
  }
}