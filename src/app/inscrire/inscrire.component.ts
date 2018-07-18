import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss']
})
export class InscrireComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");

    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

    let element = document.getElementById("nav");
    element.style.display = "none";

    this.id = this.route.snapshot.paramMap.get('id');
  }

  demarrer(){
    this.router.navigateByUrl("/test/"+this.id);
  }

}
