import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class DialogQuestionComponent implements OnInit {

  libelle: string;
  code: string;
  etat: string;
  proposition1: string;
  repJuste1;
  proposition2: string;
  repJuste2;
  proposition3: string;
  repJuste3;
  proposition4: string;
  repJuste4;
  modifEtat: boolean;
  propo3: boolean;
  propo4: boolean;
  buttonAjouter: boolean;

  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(public dialogRef: MatDialogRef<DialogQuestionComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

   if(this.data.action === "ajouter"){
      this.modifEtat = false;
      this.buttonAjouter = true;
    }
    else{
      this.modifEtat = true;
      this.buttonAjouter = false;
      this.libelle = this.data.question.libelle;
      this.code = this.data.question.code;
      if(this.data.question.etat === true)
      {
        this.etat = "valider";
      }
      else{
        this.etat = "nonValider";
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ajouterProposition(){
    if(this.propo3 !== true){
      this.propo3 = true;
    }else{
      this.propo4 = true;
      this.buttonAjouter = false;
    }
  }

  supprimerProposition(){
    if(this.propo4 !== false){
      this.propo4 = false;
    }else{
      this.propo3 = false;
      this.buttonAjouter = true;
    }
  }

  valider(){
    this.dialogRef.close();
  }

}
