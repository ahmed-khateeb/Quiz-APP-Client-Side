import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user/user.service';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ErrorComponent,
    TeacherComponent,
    TeacherProfileComponent,
    QuizComponent,
    QuestionComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
