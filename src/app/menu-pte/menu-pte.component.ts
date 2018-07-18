import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NiveauService } from '../services/niveau.service';
import { LangageService } from '../services/langage.service';
import { TypeQuestionService } from '../services/type-question.service';
import { Niveau } from '../models/niveau';
import { Langage } from '../models/langage';
import { TypeQuestion } from '../models/typeQuestion';

@Component({
  selector: 'app-menu-pte',
  templateUrl: './menu-pte.component.html',
  styleUrls: ['./menu-pte.component.scss']
})
export class MenuPteComponent implements OnInit {

  constructor(private niveauService: NiveauService,
    private langageService: LangageService,
    private typeQuestionService: TypeQuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

  inscrire: boolean;
  question: boolean;
  niveaux: Niveau[];
  langages: Langage[] = [];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;
  niveauSelected: number;
  typeQuestionSelected: number;

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      let IdUserElement = document.getElementsByClassName("user");
      IdUserElement.item(0).id = this.route.snapshot.paramMap.get('id');
    }

    let menuElement = document.getElementById("entete");
    let NavElement = document.getElementById("nav");
    let Userelement = document.getElementById("user");

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
    this.router.navigateByUrl("/inscrire/" + this.niveauSelected + "/" + this.typeQuestionSelected);
    console.log(this.typeQuestionSelected);
    console.log(this.niveauSelected);
  }

  onItemChange(typeQuestion: any) {
    if (typeQuestion.libelle === "Technique") {
      this.langageAffiche = true;
    } else {
      this.langageAffiche = false;
    }

    for (let i = 0; i < this.langages.length; ++i) {
      if (this.langages[i].libelle === "Autres") {
        this.langages.splice(i, 1);
      }
    }
  }
}
