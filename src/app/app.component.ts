import { Component } from '@angular/core';
import { Connexion } from './model/connexion';
import { UtilisateurService } from './services/utilisateur.service';
import { Utilisateur } from './model/utilisateur';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  login: string;
  password: string;
  connexion = new Connexion();
  reponse: string;
  currentUser: Utilisateur;
  location: Location;

  constructor(location: Location, private utilisateurService: UtilisateurService) { 
    this.location = location;
  }

  getConnexion(){
    this.connexion.login = this.login;
    this.connexion.password = this.password;

    this.utilisateurService.postConnexion(this.connexion).subscribe(rep => {
      this.reponse = rep; 
      console.log(this.reponse);

      if(this.reponse !== "refuse"){
        this.utilisateurService.getUtilisateur( this.connexion.login).subscribe(rep => {
          this.currentUser = rep;
          console.log(this.currentUser);
          this.location.go("");
        })
      }

    },
    (error: any) => {
      console.log(error)
    })
  }
}
