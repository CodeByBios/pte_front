import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatService } from '../services/candidat.service'
import { UtilisateurService } from '../services/utilisateur.service'
import { Candidat } from '../models/candidat';
import { Utilisateur } from '../models/utilisateur';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss']
})
export class InscrireComponent implements OnInit {

  idNiveau: number;
  idType: number;
  langages: string;
  nom: string;
  prenom: string;
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));


  constructor(private route: ActivatedRoute,
    private router: Router,
    private candidatService: CandidatService,
    private toastr: ToastrService,
    private utilisateurService: UtilisateurService) { } 

  ngOnInit() {
    let element = document.getElementById("nav");
    let element1 = document.getElementById("entete");

    element.style.display = "none";
    element1.style.display = "initial";

    this.idNiveau = +this.route.snapshot.paramMap.get('idN');
    this.idType = +this.route.snapshot.paramMap.get('idT');
    this.langages = this.route.snapshot.paramMap.get('idL');

    this.utilisateurService.logout();
    this.checkUser();
  }

  demarrer() {
    let candidat = new Candidat();
    let currentUser = new Utilisateur;

    currentUser.id = this.currentUser.utilisateur.id;
    currentUser.login = this.currentUser.utilisateur.login;
    currentUser.nom = this.currentUser.utilisateur.nom;
    currentUser.password = this.currentUser.utilisateur.password;
    currentUser.prenom = this.currentUser.utilisateur.prenom;
    currentUser.roleDto = this.currentUser.utilisateur.role;

    candidat.utilisateurDto = currentUser;
    candidat.nom = this.nom;
    candidat.prenom = this.prenom;
    candidat.temps = 20;

    console.log(candidat);

    this.candidatService.newCandidat(candidat).subscribe(rep => {
      console.log(rep);
      this.router.navigateByUrl("/test/" + this.idNiveau + "/" + this.idType + "/" + this.langages + "/" + rep.id);
      this.toastr.success('Le candidat a été crée', 'Succès');
    },
      (error: any) => {
        console.log(error);
        this.toastr.error('Ressource introuvable', 'Erreur');
      });
  }

  checkUser(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");

    if(currentUser){
       element.style.display = "initial";
       userElement.textContent = currentUser.utilisateur.nom+" "+currentUser.utilisateur.prenom;
    }else{
      element.style.display = "none";
       userElement.textContent = "";
    }
  }

}
