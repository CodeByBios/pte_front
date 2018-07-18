import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_LANGAGE } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LangageService { 

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }
    
    /**
     * get all langages
     */
    getLangages(): Observable<any> {
        return this.http.get(`${API_ENDPOINT_LANGAGE}`, {responseType: 'json'});
    }
}