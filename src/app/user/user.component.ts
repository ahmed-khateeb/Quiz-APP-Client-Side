import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from "@angular/router";
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private baseurl='http://localhost:8000/api/user/';
  //private baseurl='https://safe-ravine-48359.herokuapp.com/api/user/';
  User:User =new User();
  register = false;
  msg:string
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private userService: UserService,public router: Router) { }

  signUp(form: NgForm){
    this.userService.addUser(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        if (form.value.role === "student") this.router.navigateByUrl('/student/profile');
        else if (form.value.role === "teacher") this.router.navigateByUrl('/teacher/profile');
      },
      err => {
        if (err.status === 422) {
          this.msg = err.error.message;
        }
        else
          this.msg = 'Something went wrong.Please contact admin.';
      }
    );
  }

  signIn(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        if (form.value.role === "student") this.router.navigateByUrl('/student/profile');
        else if (form.value.role === "teacher") this.router.navigateByUrl('/teacher/profile');
      },
      err => {
        console.log(err.error)
        this.msg = err.error.message;
      }
    );
  }
  ngOnInit() {
  }

}
