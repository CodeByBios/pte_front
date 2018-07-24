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
  }

}
