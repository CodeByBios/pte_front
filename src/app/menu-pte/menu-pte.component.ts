import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NiveauService } from '../services/niveau.service';
import { LangageService } from '../services/langage.service';
import { TypeQuestionService } from '../services/type-question.service';
import { QuestionService } from '../services/question.service';
import { Niveau } from '../models/niveau';
import { Langage } from '../models/langage';
import { TypeQuestion } from '../models/typeQuestion';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-pte',
  templateUrl: './menu-pte.component.html',
  styleUrls: ['./menu-pte.component.scss']
})
export class MenuPteComponent implements OnInit {

  displayedColumns: string[] = ['niveaux', 'questionV', 'questionN', 'questionT', 'questionL', 'questionA', 'questionF'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private niveauService: NiveauService,
    private langageService: LangageService,
    private typeQuestionService: TypeQuestionService,
    private questionService: QuestionService,
    private toastr: ToastrService, 
    private route: ActivatedRoute,
    private router: Router) { }

  inscrire: boolean;
  question: boolean;
  niveaux: Niveau[];
  langages: Langage[] = [];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;
  niveauSelected: number;
  langageSelected: number;
  typeQuestionSelected: number;
  dataSource: MatTableDataSource<any>;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      let IdUserElement = document.getElementsByClassName("user");
      IdUserElement.item(0).id = this.route.snapshot.paramMap.get('id');
    }

    this.chargerTableau();
    
    let menuElement = document.getElementById("entete");
    let NavElement = document.getElementById("nav");
    let userElement = document.getElementById("user");

    userElement.textContent = this.currentUser.utilisateur.nom+" "+this.currentUser.utilisateur.prenom;
    menuElement.style.display = "initial";
    NavElement.style.display = "initial";

    this.niveauService.getNiveau().subscribe(rep => {
      this.niveaux = rep;
    },
      (error: any) => {
        console.log(error)
      })

    this.langageService.getLangages().subscribe(rep => {
      this.langages = rep;
    },
      (error: any) => {
        console.log(error)
      })

    this.typeQuestionService.getTypeQuestion().subscribe(rep => {
      this.typeQuestions = rep;
    },
      (error: any) => {
        console.log(error)
      })
  }

  suivant() {
    this.router.navigateByUrl("/inscrire/" + this.niveauSelected + "/" + this.typeQuestionSelected + "/" + this.langageSelected);
  }

  onItemChange(typeQuestion: any) {
    if (typeQuestion.libelle === "Technique") {
      this.langageSelected = 1;
      this.langageAffiche = true;
    } else {
      this.langageSelected = 7;
      this.langageAffiche = false;
    }

    for (let i = 0; i < this.langages.length; ++i) {
      if (this.langages[i].libelle === "Autres") {
        this.langages.splice(i, 1);
      }
    }
  }

  chargerTableau(){
    this.questionService.getQuestionsByNiveau().subscribe(rep => {
      this.dataSource = new MatTableDataSource(rep);

      this.paginator._intl.itemsPerPageLabel = "Nombre par page :"
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (error: any) => { 
      console.log(error)
      this.toastr.error('Ressource introuvable', 'Erreur');
    });
  }
}
