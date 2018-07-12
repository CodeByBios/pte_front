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

  ngOnInit() {
  }

  login: string;
  password: string;
  connexion = new Connexion();
  reponse: string;
  currentUser: Utilisateur;

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  getConnexion(){
    this.connexion.login = this.login;
    this.connexion.password = this.password;

    this.utilisateurService.postConnexion(this.connexion).subscribe(rep => {
      this.reponse = rep; 
      console.log(this.reponse);

      if(this.reponse !== "refuse"){
        this.utilisateurService.getUtilisateur(this.connexion.login).subscribe(rep => {
          this.currentUser = rep;
          console.log(this.currentUser);
          this.router.navigateByUrl("/lancerTest/"+this.currentUser.id);
        })
      } 

    },
    (error: any) => {
      console.log(error)
    })
  }
}
