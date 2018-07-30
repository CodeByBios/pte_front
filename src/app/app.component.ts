import { Component } from '@angular/core';
import { TEXTE_ENTETE } from './fr-FR'
import { UtilisateurService } from './services/utilisateur.service';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authenticationService: UtilisateurService,
    private router: Router) { }

  idUser: any;
  texteEntete = TEXTE_ENTETE;
  ticks = 0;
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  sub: Subscription;

  ngOnInit() {
    this.checkUser();
  }

  deconnexion() {
    this.authenticationService.logout();
    this.router.navigate(['']);
    location.reload(true);
  }

  checkUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");


    if (currentUser) {
      element.style.display = "initial";
      userElement.textContent = currentUser.utilisateur.nom + " " + currentUser.utilisateur.prenom;
    } else {
      element.style.display = "none";
      userElement.textContent = "";
    }
  }
}
