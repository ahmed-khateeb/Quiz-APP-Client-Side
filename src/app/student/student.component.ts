import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { QuizService } from '../sharedServices/quiz.service';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private userService: UserService, private quizService: QuizService,public router: Router) { }

  userDetails: User = new User();
  errMsg;
  publishedQuiz;

  getStudentDetails() {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        this.errMsg = err.error.message;
      }
    );
  }

  getPublishedQuiz() {
    this.quizService.getStudentQuiz().subscribe(res=>{
      this.publishedQuiz = res;
    },
    err => {
      this.errMsg = err.error.message
    })
  }
  
  goToQuiz(quiz_id) {
    this.router.navigate(["/quiz", quiz_id]);
  }
  ngOnInit() {
    this.getStudentDetails();

    this.getPublishedQuiz()

  }

  Logout() {
    this.userService.deleteToken();
    this.router.navigate(['/user']);
  }
}
