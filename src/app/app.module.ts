import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyOwnCustomModule } from './custom.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuPteComponent } from './menu-pte/menu-pte.component'
import { LoginComponent } from './login/login.component'
import { TestComponent } from './test/test.component'
import { InscrireComponent } from './inscrire/inscrire.component'
import { ValiderComponent } from './valider/valider.component'
import { VisualiserComponent } from './visualiser/visualiser.component'
import { ResultatComponent } from './resultat/resultat.component'
import { DialogQuestionComponent } from './dialogQuestion/question.component'
import { DialogSupprimerComponent } from './dialogSupprimer/dialog-supprimer.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuPteComponent,
    LoginComponent,
    TestComponent,
    InscrireComponent,
    ValiderComponent,
    VisualiserComponent,
    ResultatComponent,
    DialogQuestionComponent,
    DialogSupprimerComponent
  ],
  imports: [
    BrowserModule,
    MyOwnCustomModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [
    DialogQuestionComponent,
    DialogSupprimerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
