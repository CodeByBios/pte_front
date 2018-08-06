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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class DialogQuestionComponent implements OnInit {

  niveauxHtml: any[];
  langages: Langage[];
  typeQuestions: TypeQuestion[];
  langageAffiche: boolean;
  buttonAjouter: boolean;
  propo3: boolean;
  propo4: boolean;
  modifEtat: boolean;
  affiche: boolean;
  desactiverQuestion: boolean;
  pro1Check: boolean;
  pro2Check: boolean;
  pro3Check: boolean;
  pro4Check: boolean;
  pro1: boolean;
  pro2: boolean;
  pro3: boolean;
  pro4: boolean;
  role: boolean;
  buttonValider: boolean;
  typeStatus: string;
  langageStatus: string;

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
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private niveauService: NiveauService,
    private langageService: LangageService,
    private typeQuestionService: TypeQuestionService,
    private questionService: QuestionService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    if (this.currentUser.utilisateur.role.identite !== "manager") {
      this.role = false;
    } else {
      this.role = true;
    }

    this.reponse1.reponseJuste = false;
    this.reponse2.reponseJuste = false;
    this.reponse3.reponseJuste = false;
    this.reponse4.reponseJuste = false;

    if (this.data.action === "ajouter") {
      document.getElementsByTagName("h2").item(1).textContent = "Ajout d'une question";
      this.modifEtat = false;
      this.affiche = true;
      this.buttonAjouter = true;

    } else {
      document.getElementsByTagName("h2").item(1).textContent = "Modification d'une question";
      console.log(this.data.question);

      this.affiche = true;
      this.modifEtat = true;
      this.buttonAjouter = false;
      this.langageAffiche = true;
      this.libelle = this.data.question.libelle;
      this.code = this.data.question.code;
      this.typeStatus = "" + this.data.question.typeQuestionDto.id;
      this.typeQuestionSelected = this.data.question.typeQuestionDto;
      this.langageStatus = "" + this.data.question.langageDto[0].id;
      this.langageSelected = this.data.question.langageDto[0];

      let reponses = [];
      reponses = this.data.question.reponseDto;
      let i = 0;
      console.log(reponses.length);

      if (reponses.length === 4) {
        this.proposition1 = reponses[i].libelle;
        this.reponse1.id = reponses[i].id;
        this.reponse1.libelle = reponses[i].libelle;
        if (reponses[i].reponseJuste === true) {
          this.pro1Check = true;
          this.pro1 = true;
          this.reponse1.reponseJuste = true;
        } else {
          this.pro1Check = false;
          this.pro1 = false;
          this.reponse1.reponseJuste = false;
        }

        this.proposition2 = reponses[i + 1].libelle;
        this.reponse2.id = reponses[i + 1].id;
        this.reponse2.libelle = reponses[i + 1].libelle;
        if (reponses[i + 1].reponseJuste === true) {
          this.pro2Check = true;
          this.pro2 = true;
          this.reponse2.reponseJuste = true;
        } else {
          this.pro2Check = false;
          this.pro2 = false;
          this.reponse2.reponseJuste = false;
        }

        this.propo3 = true;
        this.proposition3 = reponses[i + 2].libelle;
        this.reponse3.id = reponses[i + 2].id;
        this.reponse3.libelle = reponses[i + 2].libelle;
        if (reponses[i + 2].reponseJuste === true) {
          this.pro3Check = true;
          this.pro3 = true;
          this.reponse3.reponseJuste = true;
        } else {
          this.pro3Check = false;
          this.pro3 = false;
          this.reponse3.reponseJuste = false;
        }

        this.propo4 = true;
        this.proposition4 = reponses[i + 3].libelle;
        this.reponse4.id = reponses[i + 3].id;
        this.reponse4.libelle = reponses[i + 3].libelle;
        if (reponses[i + 3].reponseJuste === true) {
          this.pro4Check = true;
          this.pro4 = true;
          this.reponse4.reponseJuste = true;
        } else {
          this.pro4Check = false;
          this.pro4 = false;
          this.reponse4.reponseJuste = false;
        }
      } else if (reponses.length === 3) {

        this.buttonAjouter = true;
        this.proposition1 = reponses[i].libelle;
        this.reponse1.id = reponses[i].id;
        this.reponse1.libelle = reponses[i].libelle;
        if (reponses[i].reponseJuste === true) {
          this.pro1Check = true;
          this.pro1 = true;
          this.reponse1.reponseJuste = true;
        } else {
          this.pro1Check = false;
          this.pro1 = false;
          this.reponse1.reponseJuste = false;
        }

        this.proposition2 = reponses[i + 1].libelle;
        this.reponse2.id = reponses[i + 1].id;
        this.reponse2.libelle = reponses[i + 1].libelle;
        if (reponses[i + 1].reponseJuste === true) {
          this.pro2Check = true;
          this.pro2 = true;
          this.reponse2.reponseJuste = true;
        } else {
          this.pro2Check = false;
          this.pro2 = false;
          this.reponse2.reponseJuste = false;
        }

        this.propo3 = true;
        this.proposition3 = reponses[i + 2].libelle;
        this.reponse3.id = reponses[i + 2].id;
        this.reponse3.libelle = reponses[i + 2].libelle;
        if (reponses[i + 2].reponseJuste === true) {
          this.pro3Check = true;
          this.pro3 = true;
          this.reponse3.reponseJuste = true;
        } else {
          this.pro3Check = false;
          this.pro3 = false;
          this.reponse3.reponseJuste = false;
        }
      } else {

        this.buttonAjouter = true;
        this.proposition1 = reponses[i].libelle;
        this.reponse1.id = reponses[i].id;
        this.reponse1.libelle = reponses[i].libelle;
        if (reponses[i].reponseJuste === true) {
          this.pro1Check = true;
          this.pro1 = true;
          this.reponse1.reponseJuste = true;
        } else {
          this.pro1Check = false;
          this.pro1 = false;
          this.reponse1.reponseJuste = false;
        }

        this.proposition2 = reponses[i + 1].libelle;
        this.reponse2.id = reponses[i + 1].id;
        this.reponse2.libelle = reponses[i + 1].libelle;
        if (reponses[i + 1].reponseJuste === true) {
          this.pro2Check = true;
          this.pro2 = true;
          this.reponse2.reponseJuste = true;
        } else {
          this.pro2Check = false;
          this.pro2 = false;
          this.reponse2.reponseJuste = false;
        }
      }

      if (this.data.question.etat === true) {
        this.etat = "valider";
        this.desactiverQuestion = true;
      }
      else {
        this.etat = "nonValider";
        this.desactiverQuestion = false;
      }
      this.checkField();
    }

    this.niveauService.getNiveau().subscribe(rep => {
      this.niveauxHtml = rep;

      if (this.data.action === "modifier") {
        for (let i = 0; i < this.niveauxHtml.length; ++i) {
          for (let j = 0; j < this.data.question.niveauDto.length; ++j) {
            if (this.niveauxHtml[i].libelle === this.data.question.niveauDto[j].libelle) {
              this.selectedNiveau(this.niveauxHtml[i]);
              this.niveauxHtml[i].isCheck = true;
              break;
            } else {
              this.niveauxHtml[i].isCheck = false;
            }
          }
        }
      }
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
    this.checkField();
  }

  supprimerProposition() {
    if (this.propo4 === true) {
      this.propo4 = false;
      this.buttonAjouter = true;
    } else {
      this.propo3 = false;
      this.buttonAjouter = true;
    }
    this.checkField();
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

    question.libelle = this.libelle;
    question.code = this.code;
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

    if (this.data.action === "ajouter") {
      question.etat = false;
      console.log(question);
      this.questionService.postQuestion(question).subscribe(rep => {
        console.log(rep);
        this.toastr.success('Question crée', 'Succès');
      },
        (error: any) => {
          console.log(error)
          this.toastr.error('Ressource introuvable', 'Erreur');
        });

    } else {
      if (this.etat === "valider") {
        question.etat = true;
      } else {
        question.etat = false;
      }
      question.id = this.data.question.id;
      console.log(question);
      this.questionService.modifierQuestion(question).subscribe(rep => {
        this.toastr.success('Question modifiée', 'Succès');
        console.log(rep);
      },
        (error: any) => {
          console.log(error)
          this.toastr.error('Ressource introuvable', 'Erreur');
        });
    }
    this.dialogRef.close({ refresh: true });
  }

  selectedTypeQuestion(typeQuestion: TypeQuestion) {
    if (typeQuestion.libelle === "Technique") {
      this.langageAffiche = true;
    } else {
      this.langageAffiche = false;
    }
    this.typeQuestionSelected = typeQuestion;
    this.checkField();
  }

  selectedLangage(langage: Langage) {
    this.langageSelected = langage;
    this.checkField();
  }

  selectedNiveau(pniveau: Niveau) {
    let ajout: boolean = true;
    let niveau = new Niveau();
    niveau.id = pniveau.id;
    niveau.libelle = pniveau.libelle;

    if (this.niveauSelected.length === 0) {
      this.niveauSelected.push(niveau);
    }
    else {
      for (let i = 0; i < this.niveauSelected.length; ++i) {
        if (this.niveauSelected[i].libelle === niveau.libelle) {
          this.niveauSelected.splice(i, 1);
          ajout = false;
        }
      }
      if (ajout === true) {
        this.niveauSelected.push(niveau);
      }
    }
    this.checkField();
  }

  repJuste1() {
    if (this.reponse1.reponseJuste === true) {
      this.reponse1.reponseJuste = false;
      this.pro1 = false;
    } else {
      this.reponse1.reponseJuste = true;
      this.pro1 = true;
    }
    this.checkField();
  }

  repJuste2() {
    if (this.reponse2.reponseJuste === true) {
      this.reponse2.reponseJuste = false;
      this.pro2 = false;
    } else {
      this.reponse2.reponseJuste = true;
      this.pro2 = true;
    }
    this.checkField();
  }

  repJuste3() {
    if (this.reponse3.reponseJuste === true) {
      this.reponse3.reponseJuste = false;
      this.pro3 = false;
    } else {
      this.reponse3.reponseJuste = true;
      this.pro3 = true;
    }
    this.checkField();
  }

  repJuste4() {
    if (this.reponse4.reponseJuste === true) {
      this.reponse4.reponseJuste = false;
      this.pro4 = false;
    } else {
      this.reponse4.reponseJuste = true;
      this.pro4 = true;
    }
    this.checkField();
  }

  toCapitalize(value: string, field: string) {
    if (field == "libelle") {
      this.libelle = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    if (field == "propo1") {
      this.proposition1 = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    if (field == "propo2") {
      this.proposition2 = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    if (field == "propo3") {
      this.proposition3 = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    if (field == "propo4") {
      this.proposition4 = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }

    this.checkField();
  }

  checkField() {
    if (this.libelle) {
      if ("" + this.niveauSelected.length !== "0" && this.typeQuestionSelected) {
        if (this.typeQuestionSelected.id !== 1) {
          if (this.propo4) {
            if (this.proposition4 && this.propo3 && this.proposition3 && this.proposition1 && this.proposition2) {
              if (this.pro1 || this.pro2 || this.pro3 || this.pro4) {
                this.buttonValider = true;
              } else {
                this.buttonValider = false;
              }
            } else {
              this.buttonValider = false;
            }
          } else {
            if (this.propo3) {
              if (this.proposition3 && this.proposition1 && this.proposition2) {
                if (this.pro1 || this.pro2 || this.pro3) {
                  this.buttonValider = true;
                } else {
                  this.buttonValider = false;
                }
              } else {
                this.buttonValider = false;
              }
            } else {
              if (this.proposition1 && this.proposition2) {
                if (this.pro1 || this.pro2) {
                  this.buttonValider = true;
                } else {
                  this.buttonValider = false;
                }
              } else {
                this.buttonValider = false;
              }
            }
          }

        } else {
          if (this.langageSelected) {
            if (this.propo4) {
              if (this.proposition4 && this.propo3 && this.proposition3 && this.proposition1 && this.proposition2) {
                if (this.pro1 || this.pro2 || this.pro3 || this.pro4) {
                  this.buttonValider = true;
                } else {
                  this.buttonValider = false;
                }
              } else {
                this.buttonValider = false;
              }
            } else {
              if (this.propo3) {
                if (this.proposition3 && this.proposition1 && this.proposition2) {
                  if (this.pro1 || this.pro2 || this.pro3) {
                    this.buttonValider = true;
                  } else {
                    this.buttonValider = false;
                  }
                } else {
                  this.buttonValider = false;
                }
              } else {
                if (this.proposition1 && this.proposition2) {
                  if (this.pro1 || this.pro2) {
                    this.buttonValider = true;
                  } else {
                    this.buttonValider = false;
                  }
                } else {
                  this.buttonValider = false;
                }
              }
            }
          } else {
            this.buttonValider = false;
          }
        }
      } else {
        this.buttonValider = false;
      }
    } else {
      this.buttonValider = false;
    }
  }
}