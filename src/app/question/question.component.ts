import { UserService } from 'src/app/user/user.service';
import { QuestionService } from './../sharedServices/question.service';
import { Router } from '@angular/router';
import { AnswerService } from './../sharedServices/answer.service';
import { Question } from './question.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answers;
  answerTitle;
  errMsg;
  index = 1;
  correct;
  hasCorrectAnswer:any = {hasCorrect: false};

  role = this.userService.getUserPayload().role;

  constructor(private router: Router, private userService: UserService, private questionService: QuestionService ,private answerService: AnswerService) { }

  getAnswers() {
    this.answerService.getQuestionAnswers(this.question._id).subscribe(res => {
      this.answers = res
      console.log(res)
    },
    err => {
      this.errMsg = err.error;      
    })
  }

  hasCorrect() {
    this.questionService.hasCorrectAnswer(this.question._id).subscribe(res => {
      this.hasCorrectAnswer = res
      this.fireEvent({number:this.number,correct:res})
      // console.log(this.hasCorrectAnswer)
    }, 
      err => {
        console.log(err)
      }
    )
  }

  deleteQuestion() {
    let sure = confirm("DO You Want to delete This Question");
    if(sure) {
      this.questionService.removeQuestion(this.question._id).subscribe(res=>{
        console.log(res)
        this.question=null
      },
      err => {
        this.errMsg = err.error.message
      })
    }
    
  }

  removeAnswer(ans_id) {
    let sure = confirm("DO You Want to delete This Answer");
    if(sure) {
      this.answerService.removeAnswer(ans_id).subscribe(res=>{
        console.log(res)
        this.hasCorrect();
        this.getAnswers();
      },
      err => {
        this.errMsg = err.error.message
      })
    }
    
  }

  onSubmit(form: NgForm) {
    this.errMsg= ""
    this.answerService.addAnswer(form.value).subscribe(res=>{
      this.hasCorrect();
      this.getAnswers();
    },
    err => {
      if(err.status == 409) {
        this.errMsg = err.error.message
      }
      else{
        console.log(err)
        this.errMsg = err.error;
      }
    }) 
  }
  
  @Input() public question: Question;
  @Input() public number: number;
  @Input() public quiz_status: string;
  @Output() public questionEvent = new EventEmitter();

  fireEvent(question_state) {
    this.questionEvent.emit(question_state)
  }
  ngOnInit() {
    this.hasCorrect()
    this.getAnswers()
  }

}
