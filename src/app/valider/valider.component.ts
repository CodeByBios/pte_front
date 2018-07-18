import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valider',
  templateUrl: './valider.component.html',
  styleUrls: ['./valider.component.scss']
})
export class ValiderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");

    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

    let element = document.getElementById("nav");
    element.style.display = "none";
  }

}
