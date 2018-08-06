import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionService } from '../services/question.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-visualiser',
  templateUrl: './dialog-visualiser.component.html',
  styleUrls: ['./dialog-visualiser.component.scss']
})
export class DialogVisualiserComponent implements OnInit {

  resultat: any;
  questions: any[] = [];
  questionsRepondu: any[] = [];

  constructor(private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogVisualiserComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.resultat = this.data.resultat;
    let idCandidat = this.data.resultat.id;

    this.questionService.getQuestionsReponduByCandidat(idCandidat).subscribe(rep => {
      this.questionsRepondu = rep;

      for (let i = 0; i < this.questionsRepondu.length; ++i) {

        let reponses = this.questionsRepondu[i].question.reponses;
        this.questionsRepondu[i].question.reponseDto = this.questionsRepondu[i].reponsesCandidat;
        this.questionsRepondu[i].question.numero = i + 1;

        for (let x = 0; x < reponses.length; ++x) {
          let cpt = 0;

          for (let y = 0; y < this.questionsRepondu[i].question.reponseDto.length; ++y) {
            if (reponses[x].libelle === this.questionsRepondu[i].question.reponseDto[y].libelle) {
              cpt++;
              if (this.questionsRepondu[i].question.reponseDto[y].reponseJuste === true) {
                this.questionsRepondu[i].question.reponseDto[y].couleur = "green";
              } else {
                this.questionsRepondu[i].question.reponseDto[y].couleur = "red";
                this.questionsRepondu[i].question.reponseDto[y].reponseJuste = true;
              }
            }
          }

          if (cpt === 0) {
            if (reponses[x].reponseJuste === false) {
              reponses[x].couleur = "black";
            } else {
              reponses[x].couleur = "green";
              reponses[x].reponseJuste = false;
            }
            this.questionsRepondu[i].question.reponseDto.push(reponses[x]);
          }
        }

        this.questions.push(this.questionsRepondu[i].question);
      }

    },
      (error: any) => {
        console.log(error)
        this.toastr.error('Ressource introuvable', 'Erreur');
      });
  }

}
