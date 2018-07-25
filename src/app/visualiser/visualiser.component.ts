import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Question } from '../models/question'
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogQuestionComponent } from '../dialogQuestion/question.component';
import { DialogSupprimerComponent } from '../dialogSupprimer/dialog-supprimer.component';
import { QuestionService } from '../services/question.service';
import { ToastrService } from 'ngx-toastr';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

@Component({
  selector: 'app-visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.scss']
})

export class VisualiserComponent implements OnInit {

  etat: string;
  displayedColumns: string[] = ['libelles', 'etats', 'types de question', 'langages', 'niveaux', 'actions'];
  questions: Question[] = [];
  dataSource: MatTableDataSource<Question>;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public dialog: MatDialog,
    private toastr: ToastrService, 
    private questionService: QuestionService,
    private http: HttpClient) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let element = document.getElementById("entete");
    element.style.display = "initial";

    this.checkUser();
    this.chargerTableau(false);
    this.etat = 'nonValider';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ajouterQuestion(): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      data: { action: "ajouter" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.etat === "valider") {
        this.chargerTableau(true);
      } else {
        this.chargerTableau(false);
      }
    });
  }

  supprimer(row: any) {
    const dialogRef = this.dialog.open(DialogSupprimerComponent, {
      data: { question: row, sujet: "question"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.etat === "valider") {
        this.chargerTableau(true);
      } else {
        this.chargerTableau(false);
      }
    });
  }

  modifier(row: any) {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      data: { question: row, action: "modifier" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.etat === "valider") {
        this.chargerTableau(true);
      } else {
        this.chargerTableau(false);
      }
    });
  }

  chargerTableau(actif: boolean) {
    this.questionService.getQuestions(actif).subscribe(rep => {
      this.questions = rep;
      this.dataSource = new MatTableDataSource(this.questions);

      this.paginator._intl.itemsPerPageLabel = "Nombre par page :"
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: any) => {
        console.log(error);
        this.toastr.error('Ressource introuvable', 'Erreur');
      })
  }

  checkUser(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");

    if(currentUser){
       element.style.display = "initial";
       userElement.textContent = currentUser.utilisateur.nom+" "+currentUser.utilisateur.prenom;
    }else{
      element.style.display = "none";
       userElement.textContent = "";
    }
  }
}
