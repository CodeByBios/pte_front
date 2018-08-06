import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_QUESTION } from '../../environments/environment';
import { API_ENDPOINT_QUESTION_REPONDU } from '../../environments/environment';
import { Question } from '../models/question'
import { QuestionRepondu } from '../models/questionRep'

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }

    /**
     * new one question
     */
    postQuestion(question: Question): Observable<any> {
        return this.http.post(`${API_ENDPOINT_QUESTION}`, question);
    }

    /**
     * modify one question
     */
    modifierQuestion(question: Question): Observable<any> {
        return this.http.put(`${API_ENDPOINT_QUESTION}`, question);
    }

    /**
     * delete one question
     */
    supprimerQuestion(id: number): Observable<any> {
        return this.http.delete(`${API_ENDPOINT_QUESTION}/${id}`, );
    }

    /**
     * get all questions by status
     */
    getQuestions(actif: boolean): Observable<any> {
        return this.http.get(`${API_ENDPOINT_QUESTION}/${actif}`);
    }

    /**
    * get all question by niveau
    */
    getQuestionsByNiveau(): Observable<any> {
        return this.http.get(`${API_ENDPOINT_QUESTION}`);
    }

    /**
     * get all questions repondu for one candidat
     */
    getQuestionsReponduByCandidat(idCandidat: number): Observable<any> {
        return this.http.get(`${API_ENDPOINT_QUESTION_REPONDU}/${idCandidat}`);
    }


     /**
     * post one question repondu for one candidat
     */
    postQuestionRepondu(question: QuestionRepondu): Observable<any> {
        return this.http.post(`${API_ENDPOINT_QUESTION_REPONDU}`, question);
    }
}