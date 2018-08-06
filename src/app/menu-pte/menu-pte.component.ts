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
  inscrire: boolean;
  question: boolean;
  buttonSuivant: boolean;
  niveaux: Niveau[];
  langages: Langage[] = [];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;
  niveauSelected: number;
  langageSelected: number[] = [];
  typeQuestionSelected: number;
  dataSource: MatTableDataSource<any>;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private niveauService: NiveauService,
    private langageService: LangageService,
    private typeQuestionService: TypeQuestionService,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.checkUser();
    this.chargerTableau();

    let menuElement = document.getElementById("entete");
    let NavElement = document.getElementById("nav");
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
      this.langageAffiche = true;
      this.langageSelected.pop();
    } else {
      this.langageSelected = [7];
      this.langageAffiche = false;
    }
    this.checkField();
    for (let i = 0; i < this.langages.length; ++i) {
      if (this.langages[i].libelle === "Autres") {
        this.langages.splice(i, 1);
      }
    }
  }

  selectLangage(id: number) {
    let ajout: boolean = true;

    if (this.langageSelected.length === 0) {
      this.langageSelected.push(id);
      this.checkField();
    }
    else {
      for (let i = 0; i < this.langageSelected.length; ++i) {
        if (this.langageSelected[i] === id) {
          this.langageSelected.splice(i, 1);
          this.checkField();
          ajout = false;
        }
      }

      if (ajout === true) {
        this.langageSelected.push(id);
        this.checkField();
      }
    }
  }

  chargerTableau() {
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

  checkUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");

    if (currentUser) {
      element.style.display = "initial";
      userElement.textContent = currentUser.utilisateur.prenom + " " + currentUser.utilisateur.nom;
    } else {
      element.style.display = "none";
      userElement.textContent = "";
    }
  }

  checkField() {
    if (this.niveauSelected && this.typeQuestionSelected) {
      if ("" + this.typeQuestionSelected === "1") {
        if (this.langageSelected.length === 0) {
          this.buttonSuivant = false;
        } else {
          this.buttonSuivant = true;
        }
      } else {
        this.buttonSuivant = true;
      }
    } else {
      this.buttonSuivant = false;
    }
  }
}
