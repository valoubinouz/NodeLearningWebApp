import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { ErrorComponent } from './error/error.component';
import { SingleQuestionComponent } from './single-question/single-question.component';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'course/:id', component: SinglePostComponent},
  { path: 'category/:id', component: SingleCategoryComponent},
  { path: 'questions/:id', component: SingleQuestionComponent},
  { path: '**', component: ErrorComponent },
  { path: '404', component: ErrorComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
