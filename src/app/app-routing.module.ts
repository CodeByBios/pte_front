import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPteComponent } from './menu-pte/menu-pte.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lancerTest/:id', component: MenuPteComponent }
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
