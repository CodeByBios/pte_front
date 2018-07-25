import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CANDIDAT } from '../../environments/environment';
import { API_ENDPOINT_TEST } from '../../environments/environment';
import { Candidat } from '../models/candidat';

@Injectable({
    providedIn: 'root'
})
export class CandidatService {

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }
    
    /**
     * get all candidats
     */
    getCandidats(): Observable<any> {
        return this.http.get(`${API_ENDPOINT_CANDIDAT}`, {responseType: 'json'});
    }

    /**
     * get one candidat
     */
    getCandidat(idCandidat: number): Observable<any> {
        return this.http.get(`${API_ENDPOINT_CANDIDAT}/${idCandidat}`, {responseType: 'json'});
    }

    /**
     * new candidat
     */
    newCandidat(candidat: Candidat): Observable<any> {
        return this.http.post(`${API_ENDPOINT_CANDIDAT}`, candidat);
    }

    /**
     * create one test
     */
    createTest(idN: number, idL: number[], idT: number, idC: number): Observable<any> {
        return this.http.post(`${API_ENDPOINT_TEST}/${idN}/${idL}/${idT}/${idC}`, {responseType: 'json'});
    }
    
     /**
     * delete one candidat
     */
    deleteCandidat(id: Candidat): Observable<any> {
        return this.http.delete(`${API_ENDPOINT_CANDIDAT}/${id}`);
    }

     /**
     * delete one candidat
     */
    modifierCandidat(candidat: Candidat): Observable<any> {
        return this.http.put(`${API_ENDPOINT_CANDIDAT}` , candidat);
    }
}