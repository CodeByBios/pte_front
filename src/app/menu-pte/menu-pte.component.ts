import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-pte',
  templateUrl: './menu-pte.component.html',
  styleUrls: ['./menu-pte.component.scss']
})
export class MenuPteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  idUser: string;
  inscrire: boolean;
  question: boolean;

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');

    let element = document.getElementById("entete");
    let element1 = document.getElementById("user");
    let element2 = document.getElementById("nav");
    let element3 = document.getElementsByClassName("user");

    element.style.display = "initial";
    element1.textContent = "Brice BETTY"
    element2.style.display = "initial";
    element3.item(0).id = this.idUser;
  }

  suivant(){
    this.router.navigateByUrl("/inscrire/"+this.idUser);
  }
}
