import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_NIVEAU } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NiveauService {

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }
    
    /**
     * get all niveaux
     */
    getNiveau(): Observable<any> {
        return this.http.get(`${API_ENDPOINT_NIVEAU}`, {responseType: 'json'});
    }
}