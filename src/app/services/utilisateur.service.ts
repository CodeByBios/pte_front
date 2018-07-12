import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT_UTILISATEUR } from '../../environments/environment';
import { Utilisateur } from '../model/utilisateur';
import { Connexion } from '../model/connexion';
/**
 * Service managing tags API
 */
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
     * get a Utilisateur by id
     * @param login
     */
    getUtilisateur(login: string): Observable<any> {
        return this.http.get(`${API_ENDPOINT_UTILISATEUR}/${login}`, {responseType: 'json'});
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
        return this.http.post(`${API_ENDPOINT_UTILISATEUR}/connexion`, connexion, {responseType: 'text'});
    }
}