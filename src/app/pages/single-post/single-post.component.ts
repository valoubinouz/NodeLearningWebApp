import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;  
  public course: any;
  public id: any;
  public questions: any;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: MdbModalService
    ) { }
    
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getSummariesCourses();
      this.getQuestions();
    }
    
    getSummariesCourses() {
      this.http.get('http://localhost:3000/api/course/'+this.id).subscribe((res)=>{
        this.course = res;
      },(err)=>{
        this.course = null;
      })
    }
    
    getQuestions() {
      this.http.get('http://localhost:3000/api/questions-course/'+this.id).subscribe((res)=>{
        this.questions = res;
      },(err)=>{
        this.course = null;
      })
    }
    
    add() {
      this.modalRef = this.modalService.open(ModalComponent, {
        data: { course: this.course },
      });
      this.modalRef.onClose.subscribe(() => {
        this.getQuestions();
      });
    }

    start() {
      throw new Error('Method not implemented.');
    }
  }
