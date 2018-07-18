import { Component,OnInit } from '@angular/core';
import { Connexion } from '../models/connexion';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  erreur: boolean;
  login: string;
  password: string;
  connexion = new Connexion();
  reponse: string;
  currentUser: Utilisateur;

  ngOnInit() {
    this.erreur = false;
    let element = document.getElementById("entete");
    element.style.display = "none";
  }
  
  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  getConnexion(){
    this.connexion.login = this.login;
    this.connexion.password = this.password;

    this.utilisateurService.postConnexion(this.connexion).subscribe(rep => {
      this.reponse = rep; 
      console.log(this.reponse);

      if(this.reponse !== "refuse"){
        this.erreur = true;
        this.utilisateurService.getUtilisateur(this.connexion.login).subscribe(rep => {
          this.currentUser = rep;
          console.log(this.currentUser);
          this.router.navigateByUrl("/lancerUnTest/"+this.currentUser.id);
        })
      }else{
        this.erreur = true;
      }

    },
    (error: any) => {
      console.log(error)
    })
  }
}
