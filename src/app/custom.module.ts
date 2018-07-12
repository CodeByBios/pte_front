import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [MatButtonModule, 
            MatCheckboxModule,
            MatInputModule, 
            FormsModule, 
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule],

  exports: [MatButtonModule,
            MatCheckboxModule,
            MatInputModule,
            FormsModule, 
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule],
})

export class MyOwnCustomModule { }