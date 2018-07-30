import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionService } from '../services/question.service';
import { CandidatService } from '../services/candidat.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dialog-supprimer',
  templateUrl: './dialog-supprimer.component.html',
  styleUrls: ['./dialog-supprimer.component.scss']
})
export class DialogSupprimerComponent implements OnInit {

  constructor(private candidatService: CandidatService,
    private questionService: QuestionService,
    private toastr: ToastrService,
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
        this.toastr.success('Question la question a été supprimé', 'Succès');
      },
        (error: any) => {
          console.log(error)
          this.toastr.error('Ressource introuvable', 'Erreur');
        });
      this.onNoClick();

    } else {
      this.candidatService.deleteCandidat(this.data.question.id).subscribe(rep => {
        console.log(rep);
        this.toastr.success('Le candidat a été supprimé', 'Succès');
      },
        (error: any) => {
          console.log(error)
          this.toastr.error('Ressource introuvable', 'Erreur');
        });
      this.onNoClick();
    }
  }
}
