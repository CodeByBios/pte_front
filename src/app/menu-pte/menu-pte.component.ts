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
              private router: Router) {}

  idUser: string;
  inscrire: boolean;
  question: boolean;
  niveaux: Niveau[];
  langages: Langage[];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');

    let element = document.getElementById("entete");
    let element1 = document.getElementById("user");
    let element2 = document.getElementById("nav");
    let element3 = document.getElementsByClassName("user");

    element.style.display = "initial";
    element2.style.display = "initial";

    element1.textContent = "Brice BETTY"
    element3.item(0).id = this.idUser;

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

  suivant(){
    this.router.navigateByUrl("/inscrire/"+this.idUser);
  }

  onItemChange(typeQuestion: any){
    if(typeQuestion.libelle === "Techniques"){
      this.langageAffiche = true;
    }else{
      this.langageAffiche = false;
    }
  }
}
