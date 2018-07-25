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
  idLangage: number;
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
    this.idLangage = +this.route.snapshot.paramMap.get('idL');

    this.utilisateurService.logout();
  }

  demarrer() {
    let candidat = new Candidat();
    let currentUser = new Utilisateur;

    currentUser.id = this.currentUser.id;
    currentUser.login = this.currentUser.login;
    currentUser.nom = this.currentUser.nom;
    currentUser.password = this.currentUser.password;
    currentUser.prenom = this.currentUser.prenom;
    currentUser.roleDto = this.currentUser.role;

    candidat.utilisateurDto = currentUser;
    candidat.nom = this.nom;
    candidat.prenom = this.prenom;
    candidat.temps = 20;

    console.log(candidat);

    this.candidatService.newCandidat(candidat).subscribe(rep => {
      console.log(rep);
      this.router.navigateByUrl("/test/" + this.idNiveau + "/" + this.idType + "/" + this.idLangage + "/" + rep.id);
      this.toastr.success('Le candidat a été crée', 'Succès');
    },
      (error: any) => {
        console.log(error);
        this.toastr.error('Ressource introuvable', 'Erreur');
      });
  }

}
