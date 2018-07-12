import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyOwnCustomModule } from './custom.module'
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
    MyOwnCustomModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
