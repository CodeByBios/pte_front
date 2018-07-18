import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_TYPE_QUESTION } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypeQuestionService { 

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }
    
    /**
     * get all langages
     */
    getTypeQuestion(): Observable<any> {
        return this.http.get(`${API_ENDPOINT_TYPE_QUESTION}`, {responseType: 'json'});
    }
}