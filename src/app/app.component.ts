import { Component } from '@angular/core'; 
import { TEXTE_ENTETE } from './fr-FR'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  idUser: any;
  texteEntete = TEXTE_ENTETE;

  ngOnInit() {}
}
