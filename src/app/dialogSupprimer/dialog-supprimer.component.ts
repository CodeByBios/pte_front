import { Component, OnInit, Inject } from '@angular/core';
import { Question } from '../models/question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { CandidatService } from '../services/candidat.service';


@Component({
  selector: 'app-dialog-supprimer',
  templateUrl: './dialog-supprimer.component.html',
  styleUrls: ['./dialog-supprimer.component.scss']
})
export class DialogSupprimerComponent implements OnInit {

  constructor(private candidatService: CandidatService, 
              private questionService: QuestionService, 
              public dialogRef: MatDialogRef<DialogSupprimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  supprimerProposition() {

    if (this.data.sujet === "question") {

      this.questionService.supprimerQuestion(this.data.question.id).subscribe(rep => {
        console.log(rep);
      },
        (error: any) => {
          console.log(error)
        });
      this.onNoClick();
      
    } else {

      this.candidatService.deleteCandidat(this.data.question.id).subscribe(rep => {
        console.log(rep);
      },
        (error: any) => {
          console.log(error)
        });
      this.onNoClick();
    }
  }
}
