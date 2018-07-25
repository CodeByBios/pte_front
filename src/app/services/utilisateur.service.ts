import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_UTILISATEUR } from '../../environments/environment';
import { API_ENDPOINT_CONNEXION } from '../../environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { Connexion } from '../models/connexion';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {

    /**
     * constructor
     * @param  {HttpClient} privatehttp Local HttpClient reference
     */
    constructor(private http: HttpClient) { }


    /**
     * get a Utilisateur by login
     * @param login
     */
    getUtilisateur(login: string): Observable<any> {
        return this.http.get(`${API_ENDPOINT_UTILISATEUR}/${login}`, {responseType: 'json'});
    }

     /**
     * get a Utilisateur by login
     * @param id
     */
    getUtilisateurById(id: number): Observable<any> {
        return this.http.get(`${API_ENDPOINT_UTILISATEUR}/user/${id}`, {responseType: 'json'});
    }

    /**
     * create  new Utilisateur
     * @param utilisateur
     */
    postUtilisateur(utilisateur: Utilisateur): Observable<any> {
        return this.http.post(`${API_ENDPOINT_UTILISATEUR}`, utilisateur);
    }

    /**
     * connexion
     * @param connexion
     */
    postConnexion(connexion: Connexion): Observable<any> {
        return this.http.post(`${API_ENDPOINT_CONNEXION}`, connexion);
    }

    /**
     * deconnexion
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}