import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  addAnswer(answer) {
    return this.http.post(environment.apiBaseUrl + '/answers/create', answer)
  }

  getQuestionAnswers(question_id) {
    return this.http.post(environment.apiBaseUrl + '/answers/get', {"question_id": question_id})
  }

  removeAnswer(answer_id) {
    return this.http.delete(environment.apiBaseUrl + '/answers/delete/' + answer_id);
  }

  updateAnswer(answer) {
    return this.http.put(environment.apiBaseUrl + '/answers/update', answer);
  }

}
