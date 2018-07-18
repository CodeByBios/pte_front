import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPteComponent } from './menu-pte/menu-pte.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { ValiderComponent } from './valider/valider.component';
import { VisualiserComponent } from './visualiser/visualiser.component';
import { ResultatComponent } from './resultat/resultat.component';
import { DialogQuestionComponent } from './dialogQuestion/question.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lancerUnTest', component: MenuPteComponent },
  { path: 'lancerUnTest/:id', component: MenuPteComponent },
  { path: 'inscrire/:id', component: InscrireComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'testValider', component: ValiderComponent },
  { path: 'gestionQuestion', component: VisualiserComponent },
  { path: 'resultats', component: ResultatComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})

export class AppRoutingModule { }
