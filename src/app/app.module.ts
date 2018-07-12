import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyOwnCustomMaterialModule } from './customMaterial.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuPteComponent } from './menu-pte/menu-pte.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuPteComponent
  ],
  imports: [
    BrowserModule,
    MyOwnCustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
