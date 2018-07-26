import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from "@angular/core";
import { CandidatService } from '../services/candidat.service'
import { Candidat } from '../models/candidat';
import { Question } from '../models/question';
import { QuestionRepJuste } from '../models/questionRepJuste';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  candidatConnected: any;
  note: number = 0;
  idNiveau: number;
  compteurQuestion: number;
  idType: number;
  langages: number[] = [];
  idCandidat: number;
  questions: any;
  bulle: boolean;
  questionsReponseJuste: QuestionRepJuste[] = [];
  questionsReponseCandidat: QuestionRepJuste[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private candidatService: CandidatService,
    private toastr: ToastrService) { }

  ngOnInit() {
    let element = document.getElementById("nav");
    let element1 = document.getElementById("entete");

    element.style.display = "none";
    element1.style.display = "initial";

    this.idNiveau = +this.route.snapshot.paramMap.get('idN');
    this.idType = +this.route.snapshot.paramMap.get('idT');
    this.idCandidat = +this.route.snapshot.paramMap.get('idC');
    let langagesString = this.route.snapshot.paramMap.get('idL');
    let compteurQuestion = 0;
    let arrayOfStrings = langagesString.split(",");

    for (let x = 0; x < arrayOfStrings.length; ++x) {
      this.langages.push(+arrayOfStrings[x]);
    }

    this.candidatService.createTest(this.idNiveau, this.langages, this.idType, this.idCandidat).subscribe(rep => {

      for (let i = 0; i < rep.length; ++i) {
        rep[i].numero = compteurQuestion + 1;
        compteurQuestion++;
      }

      this.questions = rep;

      for (let i = 0; i < this.questions.length; ++i) {
        let question = new QuestionRepJuste();
        question.numero = this.questions[i].numero;
        question.libelle = this.questions[i].libelle;
        question.reponses = [];

        for (let j = 0; j < this.questions[i].reponseDto.length; ++j) {
          if (this.questions[i].reponseDto[j].reponseJuste === true) {
            question.reponses.push(this.questions[i].reponseDto[j]);
          }
        }

        this.questionsReponseJuste.push(question);
      }

      console.log(this.questionsReponseJuste);
    },
      (error: any) => {
        this.toastr.info('Le nombre de questions est insuffisant', 'Info');
        console.log(error);
      });

      this.checkUser();
  }

  valider() {
    this.router.navigateByUrl("/testValider");

    console.log(this.questionsReponseCandidat);

    for (let i = 0; i < this.questionsReponseCandidat.length; ++i) {
      for (let j = 0; j < this.questionsReponseJuste.length; ++j) {
        if (this.questionsReponseCandidat[i].numero === this.questionsReponseJuste[j].numero) {
          if (this.questionsReponseCandidat[i].reponses.length === this.questionsReponseJuste[j].reponses.length) {
            this.compare(this.questionsReponseCandidat[i], this.questionsReponseJuste[j]);
          }
        }
      }
    }

    this.candidatConnected.note = this.note;

    this.candidatService.modifierCandidat(this.candidatConnected).subscribe(rep => { console.log(rep); },
      (error: any) => {
        console.log(error)
      });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.scrollY;
    if (number > 200) {
      this.bulle = true;
    } else if (this.bulle && number < 200) {
      this.bulle = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  repondre(pQuestion: any, pReponse: any) {
    let cpt = 0;

    if (this.questionsReponseCandidat.length === 0) {
      let question = new QuestionRepJuste();
      question.numero = pQuestion.numero;
      question.libelle = pQuestion.libelle;
      question.reponses = [];
      question.reponses.push(pReponse);

      this.questionsReponseCandidat.push(question);
    } else {

      for (let i = 0; i < this.questionsReponseCandidat.length; ++i) {
        if (this.questionsReponseCandidat[i].numero === pQuestion.numero) {
          cpt++;
          if (this.questionsReponseCandidat[i].reponses.includes(pReponse)) {
            for (let j = 0; j < this.questionsReponseCandidat[i].reponses.length; ++j) {
              if (this.questionsReponseCandidat[i].reponses[j].libelle === pReponse.libelle) {
                this.questionsReponseCandidat[i].reponses.splice(j, 1);
              }
            }
          } else {
            this.questionsReponseCandidat[i].reponses.push(pReponse);
          }
          break;
        }
      }

      if (cpt === 0) {
        let question = new QuestionRepJuste();
        question.numero = pQuestion.numero;
        question.libelle = pQuestion.libelle;
        question.reponses = [];
        question.reponses.push(pReponse);

        this.questionsReponseCandidat.push(question);
      }
    }
  }


  compare(pCandidat: QuestionRepJuste, pReponseJuste: QuestionRepJuste) {
    let n = pCandidat.reponses.length;
    let cpt = 0;

    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        if (pCandidat.reponses[i].libelle === pReponseJuste.reponses[j].libelle) {
          cpt++;
        }
      }
    }

    if (cpt === n) {
      this.note++;
    }
  }

  checkUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");

    this.candidatService.getCandidat(this.idCandidat).subscribe(rep => {
      this.candidatConnected = rep;

      if (currentUser) {
        element.style.display = "initial";
        userElement.textContent = currentUser.utilisateur.nom + " " + currentUser.utilisateur.prenom;
      } else {
        element.style.display = "none";
        userElement.textContent = this.candidatConnected.nom + " " + this.candidatConnected.prenom;
      }
    },
      (error: any) => {
        console.log(error)
      });
  }
}
