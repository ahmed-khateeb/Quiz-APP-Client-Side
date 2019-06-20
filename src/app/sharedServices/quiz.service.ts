import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from '../quiz/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  addQuiz(quiz) {
    return this.http.post(environment.apiBaseUrl + '/quiz/create', quiz)
  }

  findQuiz(quiz_id) {
    return this.http.get<Quiz>(environment.apiBaseUrl + '/quiz/get/' + quiz_id )
  }

  deleteQuiz(quiz_id) {
    return this.http.delete<Quiz>(environment.apiBaseUrl + '/quiz/' + quiz_id )
  }
  publishQuiz(quiz_id) {
    return this.http.put<Quiz>(environment.apiBaseUrl + '/quiz/updateStatus', {"quiz_id": quiz_id})
  }
  //Teacher Pending Quizzes
  getPending() {
    return this.http.get(environment.apiBaseUrl + '/quiz/pending');
  }

  getPublished() {
    return this.http.get(environment.apiBaseUrl + '/quiz/published');
  }

  getStudentQuiz() {
    return this.http.get(environment.apiBaseUrl + '/quiz/allPublished');
  }
}
