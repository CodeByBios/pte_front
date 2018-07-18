import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  id: string;
  questions: any;
  bulle: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");

    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

    let element = document.getElementById("nav");
    element.style.display = "none";

    this.id = this.route.snapshot.paramMap.get('id');
    this.questions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
