import { Question } from './../question/question.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  addQuestion(question) {
    return this.http.post(environment.apiBaseUrl + '/questions/create', question)
  }

  getQuizQuestions(quiz_id) {
    return this.http.post<Question[]>(environment.apiBaseUrl + '/questions/get', {"quiz_id": quiz_id})
  }
  //Teacher Pending Quizzes
  removeQuestion(question_id) {
    return this.http.delete(environment.apiBaseUrl + '/questions/' + question_id);
  }

  hasCorrectAnswer(question_id){
    return this.http.get(environment.apiBaseUrl + '/questions/' + question_id + '/hasCorrectAnswer')
  }
  updateQuestion(question) {
    return this.http.put(environment.apiBaseUrl + '/questions/update', question);
  }

}
