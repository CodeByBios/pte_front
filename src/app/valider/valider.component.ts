import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valider',
  templateUrl: './valider.component.html',
  styleUrls: ['./valider.component.scss']
})
export class ValiderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let element = document.getElementById("nav");
    element.style.display = "none";

    let element1 = document.getElementById("entete");
    element1.style.display = "initial";

    sessionStorage.removeItem('currentUser');
    this.checkUser();
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
