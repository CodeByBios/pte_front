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

  idUser: number;
  idNiveau: number;
  idType: number;
  idLangage: number;
  nom: string;
  prenom: string;
  

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private candidatService: CandidatService,
              private toastr: ToastrService, 
              private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    let element = document.getElementById("nav");
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");
    let IdUserElement = document.getElementsByClassName("user");

    element.style.display = "none";
    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

    this.idUser = +IdUserElement.item(0).id;
    this.idNiveau = +this.route.snapshot.paramMap.get('idN');
    this.idType = +this.route.snapshot.paramMap.get('idT');
    this.idLangage = +this.route.snapshot.paramMap.get('idL');
  }

  demarrer(){
    let candidat = new Candidat();
    let currentUser = new Utilisateur;
    
    this.utilisateurService.getUtilisateurById(this.idUser).subscribe(rep => {
      currentUser.id = rep.id;
      currentUser.login = rep.login;
      currentUser.nom = rep.nom;
      currentUser.password= rep.password;
      currentUser.prenom = rep.prenom;
      currentUser.roleDto = rep.role;

      candidat.utilisateurDto = currentUser;
      candidat.nom = this.nom;
      candidat.prenom =this. prenom;
      candidat.temps = 20;

      console.log(candidat);

      this.candidatService.newCandidat(candidat).subscribe(rep => {
        console.log(rep);
        this.router.navigateByUrl("/test/"+this.idNiveau+"/"+this.idType+"/"+this.idLangage+"/"+rep.id);
        this.toastr.success('Le candidat a été crée', 'Succès');
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Ressource introuvable', 'Erreur');
      }); 
    },
    (error: any) => {
      console.log(error);
    }); 
  }

}
