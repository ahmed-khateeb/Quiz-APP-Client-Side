import { QuestionComponent } from './question/question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { SignGuard } from './guards/sign.guard';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherGuard } from './guards/teacher.guard';
import { AuthGuard } from './guards/auth.guard';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudentGuard } from './guards/student.guard';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:"user",component:UserComponent, canActivate: [SignGuard] },

  {
    path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard, TeacherGuard],
    children: [{ path: 'profile', component: TeacherProfileComponent },
    { path: '', redirectTo: '/teacher/profile', pathMatch: 'full' }
    ]
  },

  {
    path: 'quiz/:quiz_id', component: QuizComponent, canActivate: [AuthGuard],
  },

  {
    path: 'student/profile', component: StudentComponent, canActivate: [AuthGuard, StudentGuard],
  },

  {path:"",redirectTo:"user",pathMatch:"full"},
  {path:"**",component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
