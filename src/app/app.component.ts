import { Component } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  idUser: any;

  ngOnInit() {
    let element = document.getElementsByClassName("user");
     this.idUser = element.item(0).id;
  }
}
