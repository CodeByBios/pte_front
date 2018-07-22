import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from "@angular/core";
import { CandidatService } from '../services/candidat.service'
import { Candidat } from '../models/candidat';
import { Question } from '../models/question';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  idNiveau: number;
  compteurQuestion: number;
  idType: number;
  idLangage: number;
  idCandidat: number;
  questions: Question[];
  bulle: boolean;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private candidatService: CandidatService) { }

  ngOnInit() {
    let element = document.getElementById("nav");
    let element1 = document.getElementById("entete");
    
    element.style.display = "none";
    element1.style.display = "initial";

    this.idNiveau = +this.route.snapshot.paramMap.get('idN');
    this.idType = +this.route.snapshot.paramMap.get('idT');
    this.idLangage = +this.route.snapshot.paramMap.get('idL');
    this.idCandidat = +this.route.snapshot.paramMap.get('idC');
    let compteurQuestion = 0;

    this.candidatService.createTest(this.idNiveau,this.idLangage,this.idType,this.idCandidat).subscribe(rep => {
      
      for (let i = 0; i < rep.length; ++i) {
          rep[i].numero = compteurQuestion+1;
          compteurQuestion++;
      }

      this.questions = rep;
      console.log(this.questions);
    },
    (error: any) => {
      console.log(error)
    }); 

  }

  valider() {
    this.router.navigateByUrl("/testValider");
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.scrollY;
    if (number > 200) {
      this.bulle = true;
    } else if (this.bulle && number < 200) {
      this.bulle = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
