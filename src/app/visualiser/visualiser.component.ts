import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Question} from '../models/question'
import {Reponse} from '../models/reponse'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogQuestionComponent} from '../dialogQuestion/question.component'
import {DialogSupprimerComponent} from '../dialogSupprimer/dialog-supprimer.component'
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

@Component({
  selector: 'app-visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.scss']
})

export class VisualiserComponent implements OnInit {

  etat: string;
  displayedColumns: string[] = ['libelles', 'etats', 'types de question', 'langages', 'niveaux', 'actions'];
  dataSource: MatTableDataSource<Question>;

  constructor(public dialog: MatDialog) {
    let question1 = new Question();
    let question2 = new Question();
    let reponse = new Reponse;
    const reponses = [reponse];

    reponse.libelle = "reponse 1 test"

    question1.libelle = "test tableau 1 kjdhfkhdslhnsflknvlsnvlks";
    question1.etat = true;
    question1.reponseDto = reponses;

    question2.libelle = "test tableau 2";
    question2.etat = true;

    const questions = [question1, question2];
    this.dataSource = new MatTableDataSource(questions);
   }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");

    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
      data: {action: "ajouter"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  supprimer(row: any){
    const dialogRef = this.dialog.open(DialogSupprimerComponent, {
      data: {question: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  modifier(row: any){
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      data: {question: row, action: "modifier"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
