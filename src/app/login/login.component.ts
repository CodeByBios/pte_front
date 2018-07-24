import { Component,OnInit } from '@angular/core';
import { Connexion } from '../models/connexion';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';
import { Router } from '@angular/router';
import { TEXTE_ENTETE } from '../fr-FR'


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
  texteEntete = TEXTE_ENTETE;

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

      if(rep){
        this.erreur = false;
        this.utilisateurService.getUtilisateur(this.connexion.login).subscribe(rep => {
          console.log(rep);
          this.router.navigateByUrl("/lancerUnTest");
        })
      }else{
        this.erreur = true;
      }
    },
    (error: any) => {
      console.log(error);
    })
  }
}
