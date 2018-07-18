import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionService } from '../services/question.service'
import { Question } from '../models/question';
import { Niveau } from '../models/niveau';
import { Langage } from '../models/langage';
import { TypeQuestion } from '../models/typeQuestion';
import { NiveauService } from '../services/niveau.service';
import { LangageService } from '../services/langage.service';
import { TypeQuestionService } from '../services/type-question.service';
import { Reponse } from '../models/reponse';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class DialogQuestionComponent implements OnInit {

  niveaux: Niveau[];
  langages: Langage[];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;
  buttonAjouter: boolean;
  propo3: boolean;
  propo4: boolean;
  modifEtat: boolean;

  libelle: string;
  code: string;
  etat: string;
  typeQuestionSelected: TypeQuestion;
  langageSelected: Langage;
  niveauSelected: Niveau[] = [];
  reponses: Reponse[] = [];
  proposition1: string;
  reponse1 = new Reponse();
  proposition2: string;
  reponse2 = new Reponse();
  proposition3: string;
  reponse3 = new Reponse();
  proposition4: string;
  reponse4 = new Reponse();

  constructor(private niveauService: NiveauService,
    private langageService: LangageService,
    private typeQuestionService: TypeQuestionService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.action === "ajouter") {
      let element = document.getElementsByTagName("h2").item(1).textContent = "Ajout d'une question";
      this.modifEtat = false;
      this.buttonAjouter = true;
    }
    else {
      document.getElementsByTagName("h2").item(1).textContent = "Modification d'une question";
      this.modifEtat = true;
      this.buttonAjouter = false;
      this.libelle = this.data.question.libelle;
      this.code = this.data.question.code;
      if (this.data.question.etat === true) {
        this.etat = "valider";
      }
      else {
        this.etat = "nonValider";
      }
    }

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

    this.reponse1.reponseJuste = false;
    this.reponse2.reponseJuste = false;
    this.reponse3.reponseJuste = false;
    this.reponse4.reponseJuste = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ajouterProposition() {
    if (this.propo3 !== true) {
      this.propo3 = true;
    } else {
      this.propo4 = true;
      this.buttonAjouter = false;
    }
  }

  supprimerProposition() {
    if (this.propo4 !== false) {
      this.propo4 = false;
    } else {
      this.propo3 = false;
      this.buttonAjouter = true;
    }
  }

  valider() {
    let question = new Question();

    this.reponse1.libelle = this.proposition1;
    this.reponse2.libelle = this.proposition2;
    this.reponses = [this.reponse1, this.reponse2];

    if (this.propo3 === true) {
      this.reponse3.libelle = this.proposition3;
      this.reponses.push(this.reponse3);
    }

    if (this.propo4 === true) {
      this.reponse4.libelle = this.proposition4;
      this.reponses.push(this.reponse4);
    }

    question.etat = false;
    question.libelle = this.libelle;
    question.niveauDto = this.niveauSelected;
    question.reponseDto = this.reponses;
    question.typeQuestionDto = this.typeQuestionSelected;

    if (this.langageAffiche === true) {
      let langages = [this.langageSelected];
      question.langageDto = langages;

    } else {
      let langage = new Langage();
      langage.id = 7;
      langage.libelle = "Autres";

      let langages = [langage];
      question.langageDto = langages;
    }

    console.log(question);

    this.questionService.postQuestion(question).subscribe(rep => {
      console.log(rep);
    },
    (error: any) => {
      console.log(error)
    })

    this.dialogRef.close({ refresh: true });
  }

  selectedTypeQuestion(typeQuestion: TypeQuestion) {
    if (typeQuestion.libelle === "Technique") {
      this.langageAffiche = true;
    } else {
      this.langageAffiche = false;
    }
    this.typeQuestionSelected = typeQuestion;
  }

  selectedLangage(langage: Langage) {
    this.langageSelected = langage;
  }

  selectedNiveau(pniveau: Niveau) {
    let ajout: boolean = true;

    if (this.niveauSelected.length === 0) {
      this.niveauSelected.push(pniveau);
    }
    else {
      for (let i = 0; i < this.niveauSelected.length; ++i) {
        if (this.niveauSelected[i].libelle === pniveau.libelle) {
          this.niveauSelected.splice(i, 1);
          ajout = false;
        }
      }
      if (ajout === true) {
        this.niveauSelected.push(pniveau);
      }
    }
  }

  repJuste1() {
    if (this.reponse1.reponseJuste === true) {
      this.reponse1.reponseJuste = false;
    } else {
      this.reponse1.reponseJuste = true;
    }
  }

  repJuste2() {
    if (this.reponse2.reponseJuste === true) {
      this.reponse2.reponseJuste = false;
    } else {
      this.reponse2.reponseJuste = true;
    }
  }

  repJuste3() {
    if (this.reponse3.reponseJuste === true) {
      this.reponse3.reponseJuste = false;
    } else {
      this.reponse3.reponseJuste = true;
    }
  }

  repJuste4() {
    if (this.reponse4.reponseJuste === true) {
      this.reponse4.reponseJuste = false;
    } else {
      this.reponse4.reponseJuste = true;
    }
  }
}
