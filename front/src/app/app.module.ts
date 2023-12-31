import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { SingleQuestionComponent } from './single-question/single-question.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    PostCardComponent,
    ErrorComponent,
    ModalComponent,
    SingleQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbModalModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbModule,
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
