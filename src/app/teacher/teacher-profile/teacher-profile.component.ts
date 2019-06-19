import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/sharedServices/quiz.service';
import { User } from 'src/app/user/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private userService: UserService, private quizService: QuizService,public router: Router) { }

  userDetails: User = new User();
  quizTitle;
  errMsg;
  pendingQuiz;
  publishedQuiz;

  onSubmit(form: NgForm) {
    this.errMsg = ""
    this.quizService.addQuiz(form.value).subscribe(res=>{
      this.getPendingQuiz();
    },
    err => {
      if(err.status == 409) {
        this.errMsg = err.error.message
      }
      else{
        this.errMsg = err.error;
      }
    })
  }
  getTeacherDetails() {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        this.errMsg = err.error.message;
      }
    );
  }
  getPendingQuiz() {
    this.quizService.getPending().subscribe(res=>{
      console.log(res)
      this.pendingQuiz = res;
    },
    err => {
      this.errMsg = err.error.message
    })
  }

  getPublishedQuiz() {
    this.quizService.getPublished().subscribe(res=>{
      this.publishedQuiz = res;
    },
    err => {
      this.errMsg = err.error.message
    })
  }
  
  goToQuiz(quiz_id) {
    this.router.navigate(["/quiz", quiz_id]);
  }

  deleteQuiz(quiz_id) {
    this.quizService.deleteQuiz(quiz_id).subscribe(res=>{
      console.log(res)
      this.getPendingQuiz();
      this.getPublishedQuiz();
    },
    err => {
      this.errMsg = err.error.message
    })
  }
  ngOnInit() {
    this.getTeacherDetails();

    this.getPendingQuiz();

    this.getPublishedQuiz()

  }
  Logout() {
    this.userService.deleteToken();
    this.router.navigate(['/user']);
  }
}
