import { Component, OnInit, Inject } from '@angular/core';
import { Question } from '../models/question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-supprimer',
  templateUrl: './dialog-supprimer.component.html',
  styleUrls: ['./dialog-supprimer.component.scss']
})
export class DialogSupprimerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSupprimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  supprimerProposition(){
    this.onNoClick();
  }
  
}
